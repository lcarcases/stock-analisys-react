import React, { Component } from 'react';
import styles from './IncomeStatement.module.scss';
import AgGridReact from './../../../../../components/treeDataGrid/TreeDataGrid';

class IncomeStatement extends Component {

    constructor(props) {

        super(props);

        let activeColumns = this.getActiveColumns(this.props.stocksData);
        let metricsOrdered = this.processData(this.props.stocksData);
        let dataToShow = this.getDataToShow(metricsOrdered,this.props.stocksData,true);

        let responsiveDimentions = null;

        if( window.innerWidth > 375 && window.innerWidth <= 900) {
          responsiveDimentions = {};
          responsiveDimentions.width  = '67rem';
        }

        if(window.innerWidth <= 375) {
          responsiveDimentions = {};
          responsiveDimentions.width  = '45rem';
          responsiveDimentions.marginLeft = '4.4rem';
        }

        this.state = {
             stocksData: this.props.stocksData,
             activeColumns: activeColumns,
             metrics: metricsOrdered,
             data: dataToShow,
             responsiveDimentions: responsiveDimentions
          };
     }

     processData(stocksData) {
        let metrics = this.sortStatementByPosition(stocksData.incomeStatement[0]);
        let metricsRowData = [];
        for(let i=0; i < metrics.length; i++) {
            let metric = metrics[i];
            if(metric.position === 1) {
              metricsRowData.push(metric);
            } else {
              let parentPosition = this.findParentPosition(metric,metrics,i-1);
              if(parentPosition !== -1) {
                if(metrics[parentPosition].children === undefined) {
                  metrics[parentPosition].children = [];
                  metrics[parentPosition].children.push(metric);
                  metrics[parentPosition].isOpen = false;
                } else {
                  metrics[parentPosition].children.push(metric);
                  metrics[parentPosition].isOpen = false;
                }
                metric.parent = metrics[parentPosition];
              }
            }
        }

        return metrics;
    }

    findParentPosition(metric,metrics,i) {
        let found = false;
        let pos = i;
        while (!found && pos >= 0) {
            if(metrics[pos].intend < metric.intend) {
                found = true;
            } else {
                pos--;
            }
        }

        return (found) ? pos : -1;
    }

    sortStatementByPosition(statement) {
        let metrics = Object.keys(statement);
        let metricsToOrder = [];
        let key = '';
        for(let i=0; i < metrics.length; i++) {
            let metric = null;
            key = metrics[i];
            if(key !== 'fiscalPeriod' && key !== '_id') {
              key = metrics[i];
                  metric = {
                             name: statement[key].name,
                             position: statement[key].position,
                             intend: statement[key].intend,
                             value: statement[key].value,
                             key: key,
                           };
              metricsToOrder.push(metric);
            }

        }
        return metricsToOrder.sort(function (metric1, metric2) {
            return  parseFloat(metric1.position) - parseFloat(metric2.position)});
    }

    getActiveColumns(stocksData) {
      let ratiosByFiscalPeriod = stocksData.incomeStatement;
      let activeHeaderColumns = [];

      let headerColumn = {
                      headerName: 'Metric/Fiscal Period',
                      field: 'metricFiscalPeriod',
                      position: 1,
                      cellStyle: params => {
                            return this.setMetricCellStyle(params);
                      }
                    };
      activeHeaderColumns.push(headerColumn);
      for(let i = 0; i < ratiosByFiscalPeriod.length; i++) {
          let headerName = ratiosByFiscalPeriod[i].fiscalPeriod;
          let field      = this.setToCamelCase(ratiosByFiscalPeriod[i].fiscalPeriod);
          let position   = i+2;

          headerColumn = {
                            headerName,
                            field,
                            position
                          };
          activeHeaderColumns.push(headerColumn);
      }

      return activeHeaderColumns;
    }

    getDataToShow(metricsOrdered,stocksData,isInitialData = true) {
        let incomeStatements = stocksData.incomeStatement;
        let ratiosByFiscalPeriods = [];

        for(let i = 0; i < metricsOrdered.length; i++) {
           let metric = metricsOrdered[i].key;
           let currentRatioByFiscalPeriod = {};
           if(isInitialData && metricsOrdered[i].intend === 1) {
             for(let j = 0; j < incomeStatements.length; j++) {
                if (incomeStatements[j].hasOwnProperty(metric)) {
                   let fiscalPeriod = this.setToCamelCase(incomeStatements[j].fiscalPeriod);
                   if(currentRatioByFiscalPeriod.metricFiscalPeriod === undefined) {
                        currentRatioByFiscalPeriod.metricFiscalPeriod = incomeStatements[j][metric].name;
                        currentRatioByFiscalPeriod.key = metricsOrdered[i].key;
                        currentRatioByFiscalPeriod.intend = metricsOrdered[i].intend;
                        if(metricsOrdered[i].isOpen !== undefined) {
                          currentRatioByFiscalPeriod.isOpen = false;
                        }
                   }
                   currentRatioByFiscalPeriod[fiscalPeriod] = incomeStatements[j][metric].value;
                }
             }
             ratiosByFiscalPeriods.push(currentRatioByFiscalPeriod);
           } else {
              if(!isInitialData) {
                for(let j = 0; j < incomeStatements.length; j++) {
                  if (incomeStatements[j].hasOwnProperty(metric)) {
                      let fiscalPeriod = this.setToCamelCase(incomeStatements[j].fiscalPeriod);
                      if(currentRatioByFiscalPeriod.metricFiscalPeriod === undefined) {
                            currentRatioByFiscalPeriod.metricFiscalPeriod = incomeStatements[j][metric].name;
                            currentRatioByFiscalPeriod.key = metricsOrdered[i].key;
                            currentRatioByFiscalPeriod.intend = metricsOrdered[i].intend;
                            if(metricsOrdered[i].isOpen !== undefined) {
                              currentRatioByFiscalPeriod.isOpen = false;
                            }
                      }
                      currentRatioByFiscalPeriod[fiscalPeriod] = incomeStatements[j][metric].value;
                  }
                }
                ratiosByFiscalPeriods.push(currentRatioByFiscalPeriod);

              }
           }
        }

        return ratiosByFiscalPeriods;
    }

    setToCamelCase(statementComponentName) {
      let arrStatementComponentName = statementComponentName.split(' ');

      let result = "";
      if(arrStatementComponentName.length > 1) {
          for (let i = 0; i < arrStatementComponentName.length; i++ ) {
              let currentWord = arrStatementComponentName[i];
              let tempWord = currentWord.toLowerCase();
              if(i === 0) {
                tempWord =  tempWord.substr(0,1).toLowerCase() + tempWord.substr(1);
              } else {
                tempWord =  tempWord.substr(0,1).toUpperCase() + tempWord.substr(1);
              }

              result += tempWord;
          }

      } else {
          result = arrStatementComponentName[0].toLowerCase();
      }

      return result;
   }

   onSelectedRow(selectedRow) {
      let data = this.state.data;
      let metricsOrdered = this.state.metrics;
      let dataToShow = [];

      data.forEach(function(metric) {
          if(metric.key === selectedRow.key) {
             if(metric.hasOwnProperty('isOpen')) {
                metric.isOpen = !metric.isOpen;
                let metricMetaData = this.getMetricMetadata(metricsOrdered, metric);
                metricMetaData.isOpen = metric.isOpen;
                dataToShow.push(metric);
                if(metric.isOpen) {
                  dataToShow = this.addChildrenToDataToShow(metric,dataToShow,metricsOrdered);
                }
             }
          } else {
            let metricMetaData = this.getMetricMetadata(metricsOrdered, metric);
            if(metricMetaData.intend === 1) {
              dataToShow.push(metric);
            } else {
                if(metricMetaData.parent.isOpen) {
                   dataToShow.push(metric);
                } else {
                  if(metricMetaData.hasOwnProperty('isOpen')) {
                     metricMetaData.isOpen = false;
                  }
                }
            }
          }
      }.bind(this));
      this.setState({data: dataToShow});
   }

   addChildrenToDataToShow(metric,dataToShow,metricsOrdered) {
       let metricChildren = this.getMetricChildren(metric,metricsOrdered);
       let childrenDataToShow = this.getDataToShow(metricChildren,this.state.stocksData,false);
       dataToShow = dataToShow.concat(childrenDataToShow);
       return dataToShow;
   }


   removeChildrenFromDataToShow(metric,dataToShow,metricsOrdered) {
       let metricsChildren = this.getMetricChildren(metric,metricsOrdered);
       metricsChildren.forEach(function(childrenMetric) {
              let pos = this.findMetric(childrenMetric,dataToShow);
              if (pos > -1) {
                 dataToShow.splice(pos, 1);
              }
       });

       return dataToShow;
   }

   getMetricChildren(metric,metricsOrdered) {
        let found = false;
        let metricsChildren = [];
        let i = 0;
        while (!found && i < metricsOrdered.length) {
            if(metricsOrdered[i].key === metric.key) {
               found = true;
               metricsChildren = metricsOrdered[i].children;
            } else {
               i++;
            }
        }

        return metricsChildren;
   }

   findMetric(childrenMetric,dataToShow) {
      let found = false;
      let pos = -1;
      let i = 0;
      while (!found && i < dataToShow.length) {
          if(childrenMetric.key === dataToShow[i].key) {
            found = true;
            pos = i;
          } else {
            i++;
          }
      }

      return pos;
   }

   getMetricMetadata(metricsOrdered, metric) {
      let found = false;
      let metricMetaData = null;
      let i = 0;
      while (!found && i < metricsOrdered.length) {
          if(metricsOrdered[i].key === metric.key) {
            found = true;
            metricMetaData = metricsOrdered[i];
          } else {
            i++;
          }
      }

      return metricMetaData;
   }

   setMetricCellStyle(params) {

       let styles = undefined;

       if(params.data.intend === 1) {
           styles = {
                   paddingLeft: "0rem"
                 };
       } else if(params.data.intend === 2) {
           styles = {
                      paddingLeft: "2rem"
                    };
       } else if(params.data.intend === 3) {
           styles = {
                      paddingLeft: "4rem"
                    };
       } else if (params.data.intend === 4) {
           styles = {
                      paddingLeft: "6rem"
                    };
       } else {
          styles = {
            paddingLeft: "8rem"
          };
       }

       return styles;
   }

    render () {
          return (
                <div className={styles.container}>
                      <AgGridReact
                          columnDefs={this.state.activeColumns}
                          rowData={this.state.data}
                          width = {
                                    ( this.state.responsiveDimentions != null &&
                                      this.state.responsiveDimentions.width
                                    )
                                    ? this.state.responsiveDimentions.width
                                    : '50rem'
                                  }
                          marginLeft = {
                                        ( this.state.responsiveDimentions != null &&
                                          this.state.responsiveDimentions.marginLeft
                                        )
                                        ? this.state.responsiveDimentions.marginLeft
                                        : '0rem'
                                 }
                          height = '40rem'
                          onSelectedRow = {this.onSelectedRow.bind(this)}
                      />
                </div>
          );
    }

}

export default IncomeStatement;
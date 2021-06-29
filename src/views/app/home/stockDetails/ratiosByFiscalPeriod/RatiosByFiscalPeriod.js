import React, { Component } from 'react';
import AgGridReact from './../../../../../components/dataGrid/DataGrid';
import styles from './RatiosByFiscalPeriod.module.scss';

class RatiosByFiscalPeriod extends Component {

     constructor(props) {

         super(props);

         let activesColumns = this.getActiveColumns(this.props.stocksData);
         let ratiosByFiscalPeriod = this.getRatiosByFiscalPeriod(this.props.stocksData);


         let responsiveDimentions = null;

         if( window.innerWidth > 375 && window.innerWidth <= 900) {
               responsiveDimentions = {};
               responsiveDimentions.width  = '67rem';
               responsiveDimentions.height = '52rem';
          }

         if(window.innerWidth <= 375) {
            responsiveDimentions = {};
            responsiveDimentions.width  = '45rem';
            responsiveDimentions.marginLeft = '4rem';
         }


         this.state = {
                        stocksData: this.props.stocksData,
                        ratiosByFiscalPeriod: {
                                               active_columns: activesColumns,
                                               data: ratiosByFiscalPeriod
                        },
                        responsiveDimentions: responsiveDimentions
                      };
    }

    getRatiosByFiscalPeriod(stocksData) {
        let ratiosByFiscalPeriod = stocksData[0].ratiosByFiscalPeriod;
        let ratiosByFiscalPeriods = [];

        let metrics = Object.keys(ratiosByFiscalPeriod[0]);
        for(let i = 0; i < metrics.length; i++) {
            let currentRatioByFiscalPeriod = {};
            let metric = metrics[i];
            for(let j = 0; j < ratiosByFiscalPeriod.length; j++) {
                if (ratiosByFiscalPeriod[j].hasOwnProperty(metric)) {
                    let fiscalPeriod = this.setToCamelCase(ratiosByFiscalPeriod[j].fiscalPeriod);
                    if(currentRatioByFiscalPeriod.metricFiscalPeriod === undefined) {
                        currentRatioByFiscalPeriod.metricFiscalPeriod = ratiosByFiscalPeriod[j][metric].name;
                    }
                    currentRatioByFiscalPeriod[fiscalPeriod] = ratiosByFiscalPeriod[j][metric].value;
                }
            }
            ratiosByFiscalPeriods.push(currentRatioByFiscalPeriod);
        }

        return ratiosByFiscalPeriods;
    }

    getActiveColumns(stocksData) {
        let ratiosByFiscalPeriod = stocksData[0].ratiosByFiscalPeriod;
        let activeHeaderColumns = [];
        let headerColumn = {
                         headerName: 'Metric/Fiscal Period',
                         field: 'metricFiscalPeriod',
                         position: 0
                       };
        activeHeaderColumns.push(headerColumn);
        for(let i = 0; i < ratiosByFiscalPeriod.length; i++) {
             let headerName = ratiosByFiscalPeriod[i].fiscalPeriod;
             let field      = this.setToCamelCase(ratiosByFiscalPeriod[i].fiscalPeriod);
             let position   = i+1;

             headerColumn = {
                              headerName,
                              field,
                              position
                            };
             activeHeaderColumns.push(headerColumn);
        }

        return activeHeaderColumns;
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

    render() {
         return (
            <React.Fragment>
            <div className={styles.container}>
                 <AgGridReact
                      columnDefs={this.state.ratiosByFiscalPeriod.active_columns}
                      rowData={this.state.ratiosByFiscalPeriod.data}
                      width = {
                                ( this.state.responsiveDimentions != null &&
                                this.state.responsiveDimentions.width
                                )
                                ? this.state.responsiveDimentions.width
                                : '50rem'
                              }
                      height = {
                                ( this.state.responsiveDimentions != null &&
                                  this.state.responsiveDimentions.height
                                )
                                ? this.state.responsiveDimentions.height
                                : '38rem'
                               }
                      marginLeft = {
                                     ( this.state.responsiveDimentions != null &&
                                       this.state.responsiveDimentions.marginLeft
                                     )
                                     ? this.state.responsiveDimentions.marginLeft
                                     : '0rem'
                               }
                 />
         </div>
       </React.Fragment>
         );
     }


}

export default RatiosByFiscalPeriod;
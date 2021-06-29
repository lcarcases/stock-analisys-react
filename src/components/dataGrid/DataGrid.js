import React, { Component } from 'react';
import { AgGridReact } from "ag-grid-react";
import { Redirect } from 'react-router-dom'
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import styles from './DataGrid.module.scss';
//import classNames from 'classnames';



class DataGrid extends Component {

    constructor(props) {

        super(props);

        // Dispositivo Movil tipo iphone 6,7
        let width = '50rem';
        let height = '60rem';
        let marginLeft = '0rem';
        let marginRight = '0rem';
        let marginBottom = '0rem';
        let marginTop = '0.8rem';
        //let responsiveMode = false;
        /*if(window.innerWidth <= 375) {
            width = '45.8rem';
            marginLeft = '7.7rem';
            marginBottom = '6.5rem';
            responsiveMode = true;
        }

        if(window.innerWidth > 375 && window.innerWidth <= 900 ) {
            width = '60rem';
            responsiveMode = true;
        } */

		this.state = {
            modules: [InfiniteRowModelModule],
			columnDefs: this.props.columnDefs,
            rowData: this.props.rowData,
            components: {
                loadingRenderer: function (params) {
                  if (params.value !== undefined) {
                    return params.value;
                  } else {
                    console.log("Los parametros son: ");
                    console.log(params);
                    return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
                  }
                },
            },
            overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>',
            rowBuffer: 0,
            rowSelection: 'single',
            rowModelType: 'infinite',
            paginationPageSize: 20,
            cacheOverflowSize: 2,
            maxConcurrentDatasourceRequests: 1,
            infiniteInitialRowCount: 20,
            maxBlocksInCache: 5,
            redirect: null,
            height: ( this.props.height !== undefined /*&& !responsiveMode */)
                      ? this.props.height
                      : height,
            width:  ( this.props.width !== undefined /*&& !responsiveMode*/)
                      ? this.props.width
                      : width,
            marginLeft: (this.props.marginLeft !== undefined /*&& !responsiveMode*/)
                         ? this.props.marginLeft
                         : marginLeft,
            marginRight: (this.props.marginRight !== undefined /*&& !responsiveMode*/)
                         ? this.props.marginRight
                         : marginRight,
            marginTop: (this.props.marginTop !== undefined /*&& !responsiveMode*/)
                         ? this.props.marginTop
                         : marginTop,
            marginBottom: (this.props.marginBottom !== undefined /*&& !responsiveMode*/)
                         ? this.props.marginBottom
                         : marginBottom,
            //responsiveMode: responsiveMode,
        }

    }

    orderAsc(metric1,metric2) {
        if(metric1.position > metric2.position) return 1;
        if(metric2.position > metric1.position) return -1;

        return 0;
    }

    toggleDataGridColumns(metrics) {
        metrics.sort(this.orderAsc);
        for(let i = 0; i < metrics.length; i++) {
            metrics[i].position = i;
        }
        if(this.gridApi !== undefined && this.gridColumnApi !== undefined) {
            for(let i=0; i < metrics.length; i++) {
                this.gridColumnApi.moveColumn(metrics[i].field,metrics[i].position);
            }
            this.gridApi.setColumnDefs(metrics);
        }
    }

    onGridReady = (params) => {
           this.gridApi = params.api;
           this.gridColumnApi = params.columnApi;
           this.gridApi.showLoadingOverlay();
           if(this.props.metrics !== undefined ) {
               this.toggleDataGridColumns(this.props.metrics);

           }
           if(this.props.rowData !== undefined && this.props.rowData.length > 0) {
               if(this.gridApi.rowData !== undefined) {
                   this.gridApi.rowData(this.props.dataRow);
               }

          }

          const updateData = (data) => {
            this.setState({ rowData: data });
            this.gridApi.hideOverlay();
          };

          if(this.props.data !== undefined ) {
              this.props.data(updateData);

          }

          if(this.state.rowData !== undefined && this.props.data === undefined) {
            this.gridApi.hideOverlay();
          }

    }

    onSelectionChanged = () => {
        //let history = useHistory();
        let selectedRows = this.gridApi.getSelectedRows();
        if (selectedRows.length === 1) {
            let symbol = selectedRows[0].stockName.split('-')[0].trim();
            //this.props.history.push(`/stock-details/${symbol}`);
            this.setState({redirect: `/stock-details/${symbol}`});
            //return <Redirect to={`/stock-details/${symbol}`} />;
        }
      };


    componentDidMount() {

    }

    render() {
         if (this.state.redirect != null) {
            return (<Redirect to={this.state.redirect} />);
         }
         if(window.innerWidth >= 1200 && this.state.responsiveMode) {
             this.setState({responsiveMode: false});
         }
         if(this.props.columnDefs !== undefined) {
            this.toggleDataGridColumns(this.props.columnDefs);
         }
        return (
                 <div  style={{ height: this.state.height,
                                width: (this.props.width !== undefined && !this.state.responsiveMode)
                                       ? this.props.width
                                       : this.state.width,
                                marginRight: this.props.marginRight,
                                marginTop: this.state.marginTop,
                                marginLeft: this.state.marginLeft,
                                marginBottom: this.state.marginBottom
                             }} className="ag-theme-balham pp">

                      <AgGridReact  className={styles.dataGrid}
                          columnDefs={this.props.columnDefs}
                          rowData={this.state.rowData}
                          pagination={true}
                          components={this.state.components}
                          rowSelection={this.state.rowSelection}
                          onGridReady={this.onGridReady}
                          onSelectionChanged={this.onSelectionChanged.bind(this)}
                      >
                      </AgGridReact>
                 </div>
        );

    }
}

export default DataGrid;
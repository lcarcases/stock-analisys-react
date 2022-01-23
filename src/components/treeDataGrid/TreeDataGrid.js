import React, { Component } from 'react';
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import styles from './TreeDataGrid.module.scss';
import './TreeDataGrid.css';
//import classNames from 'classnames';



class TreeDataGrid extends Component {


    constructor(props) {

        super(props);

        let isOpenColumn = {
            headerName: '',
            field: 'refunded',
            position: 0,
            editable:false,
            cellClass: 'ag-rigtharrow',
            cellRenderer: 'checkboxColumn',
            /*cellRendererParams: {
                                    checked: this.onClickCheckbox.bind(this),
                                    label: 'Click'
                                } */
          };

          if(this.props.columnDefs[0].field !== "refunded" ) {
              this.props.columnDefs.unshift(isOpenColumn);
          }

        this.state = {
                       columnDefs: this.props.columnDefs,
                       rowData: this.props.rowData,
                       components: {
                                    checkboxColumn: function (params) {
                                        if(params.data.isOpen !== undefined) {
                                            //return `<input type='checkbox' ${params.data.isOpen ? "checked" : ""} /><div></div>`;
                                            return `<input type='checkbox' ${params.data.isOpen ? "checked" : ""} /><i></i>`;
                                        }
                                    },
                       },
                       onSelectedRow: this.props.onSelectedRow,
                       rowSelection: 'single',
                       rowClassRules: {
                                        'intend-1': function (params) {
                                                    return params.data.intend === 1
                                                    },
                                        'intend-2': function (params) {
                                                        return params.data.intend === 2
                                                    },
                                        'intend-3': function (params) {
                                                        return params.data.intend === 3
                                                    },
                                        'intend-4': function (params) {
                                                        return params.data.intend === 4
                                                    },
                                      },
                        height: ( this.props.height !== undefined) ? this.props.height : '60rem',
                        width:  ( this.props.width !== undefined) ? this.props.width : '50rem',
                        marginLeft: (this.props.marginLeft !== undefined) ? this.props.marginLeft : '0rem',
                        marginRight: (this.props.marginRight !== undefined) ? this.props.marginRight : '0rem'
                     };

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
    };

    onRowClicked(e) {
        if(this.state.onSelectedRow !== undefined && e.event.target.localName === "i") {
             this.state.onSelectedRow(e.data);
        }
    }

    render() {
        return (
                <div  style={{ height: this.state.height,
                               width: this.state.width,
                               marginRight: this.props.marginRight,
                               marginLeft: this.props.marginLeft}}
                               className="ag-theme-balham aggrid-container"
                >

                    <AgGridReact  className={styles.dataGrid}
                        columnDefs={this.props.columnDefs}
                        rowData={this.props.rowData}
                        pagination={true}
                        components={this.state.components}
                        rowSelection={this.state.rowSelection}
                        rowClassRules={this.state.rowClassRules}
                        onGridReady={this.onGridReady}
                        onRowClicked={this.onRowClicked.bind(this)}
                    >
                    </AgGridReact>
               </div>
        );
    }
}

export default TreeDataGrid;
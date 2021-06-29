/*import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from "ag-grid-react";
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';*/

import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


class InfinityDataGrid extends Component {
    constructor(props) {
      super(props);

      this.state = {
        //modules: [InfiniteRowModelModule],
        columnDefs: [
          {
            headerName: 'ID',
            maxWidth: 100,
            valueGetter: 'node.id',
            cellRenderer: 'loadingRenderer',
          },
          {
            field: 'athlete',
            minWidth: 150,
          },
          { field: 'age' },
          {
            field: 'country',
            minWidth: 150,
          },
          { field: 'year' },
          {
            field: 'date',
            minWidth: 150,
          },
          {
            field: 'sport',
            minWidth: 150,
          },
          { field: 'gold' },
          { field: 'silver' },
          { field: 'bronze' },
          { field: 'total' },
        ],
        defaultColDef: {
          flex: 1,
          resizable: true,
          minWidth: 100,
        },
        components: {
          loadingRenderer: function (params) {
            if (params.value !== undefined) {
              return params.value;
            } else {
              return '<img src="https://www.ag-grid.com/example-assets/loading.gif">';
            }
          },
        },
        rowBuffer: 0,
        rowSelection: 'multiple',
        rowModelType: 'infinite',
        paginationPageSize: 100,
        cacheOverflowSize: 2,
        maxConcurrentDatasourceRequests: 1,
        infiniteInitialRowCount: 1000,
        maxBlocksInCache: 10,
      };
    }

    onGridReady = (params) => {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const httpRequest = new XMLHttpRequest();
      const updateData = (data) => {
        var dataSource = {
          rowCount: null,
          getRows: function (params) {
            console.log('asking for ' + params.startRow + ' to ' + params.endRow);
            setTimeout(function () {
              var rowsThisPage = data.slice(params.startRow, params.endRow);
              var lastRow = -1;
              if (data.length <= params.endRow) {
                lastRow = data.length;
              }
              params.successCallback(rowsThisPage, lastRow);
            }, 500);
          },
        };
        params.api.setDatasource(dataSource);
      };

      httpRequest.open(
        'GET',
        'https://www.ag-grid.com/example-assets/olympic-winners.json'
      );
      httpRequest.send();
      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
          updateData(JSON.parse(httpRequest.responseText));
        }
      };
    };

    render() {
      return (
        <div style={{ width: '100%', height: '100%' }}>
          <div
            id="myGrid"
            style={{
              height: '100%',
              width: '100%',
            }}
            className="ag-theme-alpine"
          >
            <AgGridReact
              modules={this.state.modules}
              columnDefs={this.state.columnDefs}
              defaultColDef={this.state.defaultColDef}
              components={this.state.components}
              rowBuffer={this.state.rowBuffer}
              rowSelection={this.state.rowSelection}
              rowModelType={this.state.rowModelType}
              paginationPageSize={this.state.paginationPageSize}
              cacheOverflowSize={this.state.cacheOverflowSize}
              maxConcurrentDatasourceRequests={
                this.state.maxConcurrentDatasourceRequests
              }
              infiniteInitialRowCount={this.state.infiniteInitialRowCount}
              maxBlocksInCache={this.state.maxBlocksInCache}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      );
    }
  }

  export default InfinityDataGrid;
import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
//import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

class ServerSideDataGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          field: 'athlete',
          minWidth: 220,
          filter: 'agTextColumnFilter',
        },
        {
          field: 'country',
          minWidth: 200,
          filter: 'agSetColumnFilter',
          filterParams: {
            values: [
              'United States',
              'Ireland',
              'United Kingdom',
              'Russia',
              'Australia',
              'Canada',
              'Norway',
            ],
          },
        },
        {
          field: 'year',
          filter: 'agNumberColumnFilter',
        },
        {
          field: 'sport',
          minWidth: 200,
        },
        { field: 'gold' },
        { field: 'silver' },
        { field: 'bronze' },
      ],
      defaultColDef: {
        flex: 1,
        minWidth: 100,
      },
      rowModelType: 'infinite',
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = (data) => {
      var fakeServer = createFakeServer(data);
      var datasource = createServerSideDatasource(fakeServer);
      params.api.setServerSideDatasource(datasource);
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
          className="ag-theme-alpine-dark"
        >
          <AgGridReact
            columnDefs={this.state.columnDefs}
            defaultColDef={this.state.defaultColDef}
            animateRows={true}
            rowModelType={this.state.rowModelType}
            onGridReady={this.onGridReady}
          />
        </div>
      </div>
    );
  }
}

function createServerSideDatasource(server) {
  return {
    getRows: function (params) {
      console.log(
        '[Datasource] - rows requested by grid: startRow = ' +
          params.request.startRow +
          ', endRow = ' +
          params.request.endRow
      );
      var response = server.getData();
      setTimeout(function () {
        if (response.success) {
          params.success({ rowData: response.rows });
        } else {
          params.fail();
        }
      }, 1000);
    },
  };
}
function createFakeServer(allData) {
  return {
    getData: function () {
      return {
        success: true,
        rows: allData,
      };
    },
  };
}


export default ServerSideDataGrid;
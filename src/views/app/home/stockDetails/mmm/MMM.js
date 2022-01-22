import React, { Component } from 'react';
import AgGridReact from './../../../../../components/dataGrid/DataGrid';
import styles from './MMM.module.scss';

class MMM extends Component {

     constructor(props) {

         super(props);
         let meaningData    = this.getMeaningData(this.props.stocksData);
         let moatData       = this.getMoatData(this.props.stocksData);
         let managementData = this.getManagementData(this.props.stocksData);

         let responsiveDimentions = null;

         if( window.innerWidth > 500 && window.innerWidth <= 900) {
               responsiveDimentions = {};
               responsiveDimentions.width  = '67rem';
          }

          if(window.innerWidth <= 500) {
               responsiveDimentions = {};
               responsiveDimentions.width  = '45rem';
               responsiveDimentions.marginLeft = '4rem';
          }

         this.state = {
                        stocksData: this.props.stocksData,
                        meaning: {
                                   active_columns: [
                                                     { headerName: "Meaning", field: "meaning", position: 0},
                                                     { headerName: "Rating", field: "rating", position: 1 }
                                                   ],
                                   data: meaningData,
                                   style: {
                                            height: '15rem',
                                          }
                                 },
                        moat: {
                                   active_columns: [
                                                     { headerName: "Moat: Compound Growth Rate", field: "moatCompoundGrowthRate", position: 0},
                                                     { headerName: "10 Years", field: "tenYears", position: 1 },
                                                     { headerName: "7 Years", field: "sevenYears", position: 2 },
                                                     { headerName: "5 Years", field: "fiveYears", position: 3 },
                                                     { headerName: "3 Years", field: "threeYears", position: 4 },
                                                     { headerName: "1 Years", field: "oneYears", position: 5 },
                                                     { headerName: "Rating", field: "rating", position: 6 }
                                                   ],
                                   data: moatData,
                                   style: {
                                            height: '100px',
                                          }
                              },
                        management: {
                                      active_columns: [
                                                       { headerName: "Management: Average Rate of Return", field: "managementAverageRateOfReturn", position: 0},
                                                       { headerName: "10 Years", field: "tenYears", position: 1 },
                                                       { headerName: "7 Years", field: "sevenYears", position: 2 },
                                                       { headerName: "5 Years", field: "fiveYears", position: 3 },
                                                       { headerName: "3 Years", field: "threeYears", position: 4 },
                                                       { headerName: "1 Years", field: "oneYears", position: 5 },
                                                       { headerName: "Rating", field: "rating", position: 6 }
                                                      ],
                                      data: managementData,
                                      style: {
                                               height: '100%',
                                             }
                                    },
                         responsiveDimentions: responsiveDimentions
                      };

     }

     getMeaningData(stocksData) {
          let meaning = stocksData[0].meaning;

          let meanings = [];

          for (let key in meaning) {
               if(meaning.hasOwnProperty(key)) {
                    let currentMeaning = {};
                    currentMeaning.meaning = meaning[key].name;
                    currentMeaning.rating  = meaning[key].rating;
                    meanings.push(currentMeaning);
               }
          }

          return meanings;
     }

     getMoatData(stocksData) {
          let moat = stocksData[0].averageMoatMetrics;

          let moats = [];

          for (let key in moat) {
               if(moat.hasOwnProperty(key)) {
                    let currentMoat = {};
                    currentMoat.moatCompoundGrowthRate = moat[key].name;
                    currentMoat.rating  = moat[key].rating;
                    if (typeof moat[key].averages !== 'undefined') {

                         for(let i = 0; i < moat[key].averages.length; i++) {
                                let actualYearData = moat[key].averages[i];
                                let keyYear = this.getKeyYear(actualYearData.years);
                                currentMoat[keyYear] = actualYearData.value;
                         }
                    }
                    moats.push(currentMoat);
               }
          }

          return moats;
     }

     getManagementData(stocksData) {
          let management = stocksData[0].averageMoatMetrics;

          let managements = [];

          for (let key in management) {
               if(management.hasOwnProperty(key)) {
                    let currentManagement = {};
                    currentManagement.managementAverageRateOfReturn = management[key].name;
                    currentManagement.rating  = management[key].rating;
                    if (typeof management[key].averages !== 'undefined') {

                         for(let i = 0; i < management[key].averages.length; i++) {
                                let actualYearData = management[key].averages[i];
                                let keyYear = this.getKeyYear(actualYearData.years);
                                currentManagement[keyYear] = actualYearData.value;
                         }
                    }
                    managements.push(currentManagement);
               }
          }

          return managements;
     }

     getKeyYear(year) {
          let key = "";
          switch (year) {
               case 10:
                  key = "tenYears";
                  break;
               case 7:
                  key = "sevenYears";
                 break;
               case 5:
                 key = "fiveYears";
                 break;
               case 3:
                 key = "threeYears";
                 break;
               case 1:
                 key = "oneYears";
                 break;
               case -1:
                 key = "oneYears";
                 break;
               default:
                 key = "";
          }

          return key;
     }


     render() {
         return (

               <React.Fragment>
                  <div className={styles.container}>
                       <AgGridReact
                            columnDefs={this.state.meaning.active_columns}
                            rowData={this.state.meaning.data}
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
                            height = '15rem'
                       />
                      <AgGridReact
                              columnDefs={this.state.moat.active_columns}
                              rowData={this.state.moat.data}
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
                              height = '15rem'
                      />

                      <AgGridReact
                              columnDefs={this.state.management.active_columns}
                              rowData={this.state.management.data}
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
                              height = '15rem'
                              //data={this.state.management.getDataManagement}
                      />
               </div>
             </React.Fragment>


         );
     }


}

export default MMM;
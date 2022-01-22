import React, { Component } from 'react';
import AgGridReact from './../../../../../components/dataGrid/DataGrid';
import styles from './RatiosByCategory.module.scss';

class RatiosByCategory extends Component {

     constructor(props) {

         super(props);

         let debtRatiosData    = this.getDebtRatiosData(this.props.stocksData);
         let capitalRatiosData = this.getCapitalRatiosData(this.props.stocksData);
         let liquidityRatios   = this.getLiquidityRatiosData(this.props.stocksData);
         let operatingRatios   = this.getOperatingRatiosData(this.props.stocksData);
         let priceMultiples    = this.getPriceMultiplesData(this.props.stocksData);
         let payoutRatios      = this.getPayoutRatiosData(this.props.stocksData);

         let responsiveDimentions = null;

         if( window.innerWidth > 500 && window.innerWidth <= 900) {
             responsiveDimentions = {};
             responsiveDimentions.height = '19rem';
             responsiveDimentions.width  = '35rem';
             responsiveDimentions.marginLeft = '0rem';
         }

         if(window.innerWidth <= 500) {
          responsiveDimentions = {};
          responsiveDimentions.height = '15rem';
          responsiveDimentions.width  = '45rem';
          responsiveDimentions.marginLeft = '5rem';
         }

         this.state = {
                        stocksData: this.props.stocksData,
                        debtRatios: {
                                      active_columns: [
                                                        { headerName: "Debt Ratio", field: "debtRatio", position: 0},
                                                        { headerName: "Value", field: "value", position: 1 }
                                                      ],
                                      data: debtRatiosData,
                        },
                        capitalRatios: {
                                         active_columns: [
                                                            { headerName: "Capital Ratio", field: "capitalRatio", position: 0},
                                                            { headerName: "Value", field: "value", position: 1 }
                                                        ],
                                         data: capitalRatiosData,
                       },
                       liquidityRatios: {
                                          active_columns: [
                                                             { headerName: "Liquidity Ratio", field: "liquidityRatio", position: 0},
                                                             { headerName: "Value", field: "value", position: 1 }
                                                         ],
                                          data: liquidityRatios,
                       },
                       operatingRatios: {
                                          active_columns: [
                                                               { headerName: "Operating Ratio", field: "operatingRatio", position: 0},
                                                               { headerName: "Value", field: "value", position: 1 }
                                                           ],
                                          data: operatingRatios,
                       },
                       priceMultiples: {
                                          active_columns: [
                                                             { headerName: "Price Multiple", field: "priceMultiple", position: 0},
                                                             { headerName: "Value", field: "value", position: 1 }
                                                          ],
                                          data: priceMultiples,
                       },
                       payoutRatios: {
                                          active_columns: [
                                                            { headerName: "Payout Ratio", field: "payoutRatio", position: 0},
                                                            { headerName: "Value", field: "value", position: 1 }
                                                          ],
                                         data: payoutRatios,
                       },
                       responsiveDimentions: responsiveDimentions
                    };

     }

     getDebtRatiosData(stocksData) {
           let debtRatiosData = stocksData[0].ratiosByCategory.debtRatios;
           let debtRatios = [];

           for(var key in debtRatiosData) {
               if (debtRatiosData.hasOwnProperty(key)) {
                    let currentDebtRatio = {};
                    currentDebtRatio.debtRatio = debtRatiosData[key].name;
                    currentDebtRatio.value     = debtRatiosData[key].value;
                    debtRatios.push(currentDebtRatio);
               }
           }

           return debtRatios;
     }

     getCapitalRatiosData(stocksData) {
          let capitalRatiosData = stocksData[0].ratiosByCategory.capitalRatios;
          let capitalRatios = [];

          for(var key in capitalRatiosData) {
              if (capitalRatiosData.hasOwnProperty(key)) {
                   let currentCapitalRatio = {};
                   currentCapitalRatio.capitalRatio = capitalRatiosData[key].name;
                   currentCapitalRatio.value     = capitalRatiosData[key].value;
                   capitalRatios.push(currentCapitalRatio);
              }
          }

          return capitalRatios;
    }

    getLiquidityRatiosData(stocksData) {
          let liquidityRatiosData = stocksData[0].ratiosByCategory.liquidityRatios;
          let liquidityRatios = [];

          for(var key in liquidityRatiosData) {
               if (liquidityRatiosData.hasOwnProperty(key)) {
                    let currentLiquidityRatio = {};
                    currentLiquidityRatio.liquidityRatio = liquidityRatiosData[key].name;
                    currentLiquidityRatio.value     = liquidityRatiosData[key].value;
                    liquidityRatios.push(currentLiquidityRatio);
               }
          }

          return liquidityRatios;
    }


    getOperatingRatiosData(stocksData) {
          let operatingRatiosData = stocksData[0].ratiosByCategory.operatingRatios;
          let operatingRatios = [];

          for(var key in operatingRatiosData) {
          if (operatingRatiosData.hasOwnProperty(key)) {
               let currentOperatingRatio = {};
               currentOperatingRatio.operatingRatio = operatingRatiosData[key].name;
               currentOperatingRatio.value     = operatingRatiosData[key].value;
               operatingRatios.push(currentOperatingRatio);
          }
          }

          return operatingRatios;
    }


    getPriceMultiplesData(stocksData) {
          let priceMultiplesData = stocksData[0].ratiosByCategory.priceMultiples;
          let priceMultiples = [];

          for(var key in priceMultiplesData) {
          if (priceMultiplesData.hasOwnProperty(key)) {
               let currentPriceMultiples = {};
               currentPriceMultiples.priceMultiple = priceMultiplesData[key].name;
               currentPriceMultiples.value     = priceMultiplesData[key].value;
               priceMultiples.push(currentPriceMultiples);
          }
          }

          return priceMultiples;
     }

     getPayoutRatiosData(stocksData) {
          let payoutRatiosData = stocksData[0].ratiosByCategory.priceMultiples;
          let payoutRatios = [];

          for(var key in payoutRatiosData) {
               if (payoutRatiosData.hasOwnProperty(key)) {
                    let currentPayoutRatios = {};
                    currentPayoutRatios.payoutRatio = payoutRatiosData[key].name;
                    currentPayoutRatios.value     = payoutRatiosData[key].value;
                    payoutRatios.push(currentPayoutRatios);
               }
          }

          return payoutRatios;
     }



    render() {
         return (
               <div className={styles.container}>
                   <AgGridReact
                        ref="debtRatios"
                        columnDefs={this.state.debtRatios.active_columns}
                        rowData={this.state.debtRatios.data}
                        height ={ (this.state.responsiveDimentions !== null &&
                                   this.state.responsiveDimentions.height !== undefined
                                  )
                                  ? this.state.responsiveDimentions.height
                                  : '15rem'
                                }
                        width  = { (this.state.responsiveDimentions != null &&
                                   this.state.responsiveDimentions.width
                                   )
                                   ? this.state.responsiveDimentions.width
                                   : '26rem'
                                 }
                        marginLeft = { (this.state.responsiveDimentions != null &&
                                        this.state.responsiveDimentions.marginLeft
                                        )
                                        ? this.state.responsiveDimentions.marginLeft
                                        : '0rem'
                                     }
                        marginRight = { (this.state.responsiveDimentions != null &&
                                         this.state.responsiveDimentions.marginRight
                                        )
                                        ? this.state.responsiveDimentions.marginRight
                                        : '1rem'
                                      }
                   >
                   </AgGridReact>
                   <AgGridReact
                        ref="capitalRatios"
                        columnDefs={this.state.capitalRatios.active_columns}
                        rowData={this.state.capitalRatios.data}
                        height ={ (this.state.responsiveDimentions !== null &&
                                   this.state.responsiveDimentions.height !== undefined
                                  )
                                  ? this.state.responsiveDimentions.height
                                  : '15rem'
                                }
                        width  = { (this.state.responsiveDimentions != null &&
                                    this.state.responsiveDimentions.width
                                   )
                                   ? this.state.responsiveDimentions.width
                                   : '26rem'
                                 }
                         marginLeft = { (this.state.responsiveDimentions != null &&
                                         this.state.responsiveDimentions.marginLeft
                                        )
                                        ? this.state.responsiveDimentions.marginLeft
                                        : '0rem'
                                      }
                        marginRight = { (this.state.responsiveDimentions != null &&
                                         this.state.responsiveDimentions.marginRight
                                        )
                                        ? this.state.responsiveDimentions.marginRight
                                        : '1rem'
                                      }
                   >
                   </AgGridReact>
                   <AgGridReact
                        ref="liquidityRatios"
                        columnDefs={this.state.liquidityRatios.active_columns}
                        rowData={this.state.liquidityRatios.data}
                        height = {  (this.state.responsiveDimentions !== null &&
                                        this.state.responsiveDimentions.height !== undefined
                                   )
                                   ? this.state.responsiveDimentions.height
                                   : '15rem'
                                 }
                        width  = { (this.state.responsiveDimentions != null &&
                                    this.state.responsiveDimentions.width
                                   )
                                   ? this.state.responsiveDimentions.width
                                   : '26rem'
                                 }
                         marginLeft = { (this.state.responsiveDimentions != null &&
                                        this.state.responsiveDimentions.marginLeft
                                        )
                                        ? this.state.responsiveDimentions.marginLeft
                                        : '0rem'
                                      }
                         marginRight = { (this.state.responsiveDimentions != null &&
                                             this.state.responsiveDimentions.marginRight
                                             )
                                             ? this.state.responsiveDimentions.marginRight
                                             : '1rem'
                                        }
                   >
                   </AgGridReact>
                   <AgGridReact
                        ref="operatingRatios"
                        columnDefs={this.state.operatingRatios.active_columns}
                        rowData={this.state.operatingRatios.data}
                        height ={ (this.state.responsiveDimentions !== null &&
                                   this.state.responsiveDimentions.height !== undefined
                                  )
                                  ? this.state.responsiveDimentions.height
                                  : '15rem'
                                }
                        width  = { (this.state.responsiveDimentions != null &&
                                        this.state.responsiveDimentions.width
                                   )
                                   ? this.state.responsiveDimentions.width
                                   : '26rem'
                                 }
                        marginLeft = { (this.state.responsiveDimentions != null &&
                                        this.state.responsiveDimentions.marginLeft
                                       )
                                       ? this.state.responsiveDimentions.marginLeft
                                       : '0rem'
                                     }
                        marginRight = { (this.state.responsiveDimentions != null &&
                                         this.state.responsiveDimentions.marginRight
                                        )
                                        ? this.state.responsiveDimentions.marginRight
                                        : '1rem'
                                      }
                   >
                   </AgGridReact>
                   <AgGridReact
                        ref="priceMultiples"
                        columnDefs={this.state.priceMultiples.active_columns}
                        rowData={this.state.priceMultiples.data}
                        height ={ (this.state.responsiveDimentions !== null &&
                                   this.state.responsiveDimentions.height !== undefined
                                  )
                                  ? this.state.responsiveDimentions.height
                                  : '15rem'
                                }
                        width  = { (this.state.responsiveDimentions != null &&
                                    this.state.responsiveDimentions.width
                                   )
                                   ? this.state.responsiveDimentions.width
                                   : '26rem'
                                 }
                        marginLeft = { (this.state.responsiveDimentions != null &&
                                        this.state.responsiveDimentions.marginLeft
                                       )
                                       ? this.state.responsiveDimentions.marginLeft
                                       : '0rem'
                                     }
                        marginRight = { (this.state.responsiveDimentions != null &&
                                         this.state.responsiveDimentions.marginRight
                                        )
                                        ? this.state.responsiveDimentions.marginRight
                                        : '1rem'
                                      }
                   >
                   </AgGridReact>
                   <AgGridReact
                        ref="payoutRatios"
                        columnDefs={this.state.payoutRatios.active_columns}
                        rowData={this.state.payoutRatios.data}
                        height ={ (this.state.responsiveDimentions !== null &&
                                        this.state.responsiveDimentions.height !== undefined
                                  )
                                  ? this.state.responsiveDimentions.height
                                  : '15rem'
                                }
                        width  = { (this.state.responsiveDimentions != null &&
                                    this.state.responsiveDimentions.width
                                   )
                                   ? this.state.responsiveDimentions.width
                                   : '26rem'
                                 }
                        marginLeft = { (this.state.responsiveDimentions != null &&
                                        this.state.responsiveDimentions.marginLeft
                                       )
                                       ? this.state.responsiveDimentions.marginLeft
                                       : '0rem'
                                     }
                        marginRight = { (this.state.responsiveDimentions != null &&
                                         this.state.responsiveDimentions.marginRight
                                        )
                                        ? this.state.responsiveDimentions.marginRight
                                        : '1rem'
                                      }
                   >
                   </AgGridReact>
               </div>
         );
     }


}

export default RatiosByCategory;
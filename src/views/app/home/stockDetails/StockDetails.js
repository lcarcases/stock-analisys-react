import React, { Component } from 'react';
import axios from 'axios';
import Header from './../../../../components/header/Header';
import SideMenu from './../../../../components/sideMenu/SideMenu';
import Loading from './../../../../components/loading/Loading';
import Overview from './overview/Overview';
import MMM from './mmm/MMM';
import RatiosByFiscalPeriod from './ratiosByFiscalPeriod/RatiosByFiscalPeriod';
import RatiosByCategory from './ratiosByCategory/RatiosByCategory';
import BalanceSheet from './balanceSheet/BalanceSheet';
import IncomeStatement from './incomeStatement/IncomeStatement';
import CashflowStatement from './cashflowStatement/CashflowStatement';
import styles from './StockDetails.module.scss';
import { Redirect } from 'react-router-dom';


class StockDetails extends Component {

    constructor(props) {

        super(props);
        this.state = {
                       login: true,
                       symbol: props.match.params.stock,
                       previusSymbol: '',
                       stockData: null,
                       selectedItem: -1,
                       loading: true,
                       registeredUser: (
                                         this.props.location !== undefined &&
                                         this.props.location.state !== undefined &&
                                         this.props.location.state.referrer !== undefined &&
                                         this.props.location.state.referrer.registeredUser !== undefined &&
                                         this.props.location.state.referrer.registeredUser[0] !== undefined
                                       )
                                       ? this.props.location.state.referrer.registeredUser[0]
                                       : undefined,
                     };
        this.getDataStock();
    }

    /**
     * This function get data of a stock
     * Overview (external web service)
     * Moat
     * Meaning
     * Managament
     * Ratios by Fiscal Period
     * Ratios by Category
     * Income Statement
     * Balance Sheet
     * Cashflow Statement
     */
    async getDataStock() {
        if( this.state.stockData === null  ) {
            if(!this.state.loading) {
                this.setState({loading:true});
            }
            const userRegistered = sessionStorage.getItem('User');
            const res = await axios({
                //url: `http://127.0.0.1:3000/api/v1/stocks/stock-by-symbol?symbol=${this.state.symbol}`
                url: `http://${process.env.REACT_APP_FRONTEND_APP_DOMAIN}:3000/api/v1/stocks/stock-by-symbol?symbol=${this.state.symbol}&userRegistered=${userRegistered}`
            });

            if(res.data.status === 'success') {
                 let stockData = res.data.stock;
                 stockData.incomeStatement = res.data.incomeStatement[0].incomeStatementByFiscalPeriod;
                 stockData.balanceSheet = res.data.balanceSheet[0].balanceSheetByFiscalPeriod;
                 stockData.cashflowStatement = res.data.cashFlowStatement[0].cashFlowStatementByFiscalPeriod;
                 stockData.overview = res.data.overview;

                 this.setState({
                                 stockData:stockData,
                                 selectedItem: 2,
                                 loading:false,
                                 registeredUser: (this.state.registeredUser === undefined &&
                                                  res.data.registeredUser !== undefined
                                                 )
                                                 ? res.data.registeredUser
                                                 : undefined
                               });

            } else if(res.data.status === 'notLogin') {
                this.setState({login:false});
            }

        }
    }

    onSelectedMenuItem(i) {
        this.setState({selectedItem: i});
    }

    render() {
        let username = "";
        if(!this.state.login) {
            return (<Redirect to={'/login'} />);
        }
        let newSymbol = this.props.match.params.stock;
        if( (newSymbol !== this.state.symbol)) {
            this.setState({symbol: newSymbol, previusSymbol: this.state.symbol,stockData: null, selectedItem: -1});
        } else {
            if( this.state.stockData === null &&
                this.state.previusSymbol !== '' &&
                this.state.previusSymbol !== this.state.symbol
              ) {
                this.getDataStock();
              }
        }

        let headerStyles = {};
        headerStyles.stockName = {};
        headerStyles.searchInput = {};
        headerStyles.stockName.marginLeft = '5rem';
        headerStyles.searchInput.marginLeft = '3rem';

        let containerStyles = {};

        let sideMenuStyles = {};

        if( this.state.selectedItem === 4 ) {
            if(window.innerWidth > 500 && window.innerWidth <= 900) {
              containerStyles.width = '95rem';
            } else if(window.innerWidth <= 500) {
                containerStyles.width = '54rem';
            } else {
                containerStyles.width = '92rem';
            }
        }

        if( this.state.selectedItem === 4 &&
            (window.innerWidth > 375 && window.innerWidth <= 900)
          ) {
            sideMenuStyles.height = '60.6rem';
        } else {
            sideMenuStyles.height = '50rem';
        }

        if(this.state.registeredUser !== undefined) {
            if('username' in this.state.registeredUser) {
                username = this.state.registeredUser.username;
            } else if('name' in this.state.registeredUser) {
                username = this.state.registeredUser.name;
            }
        }

        return (
                <div {...{className:styles.container}} style={{width: containerStyles.width}}>
                    <Header className={styles.header}
                            stockName={this.state.symbol}
                            userName={username}
                            headerStyles={headerStyles}>
                    </Header>
                    <div className = {styles.main}>
                        <SideMenu className={styles.sideMenu} sideMenuStyles={sideMenuStyles} onSelectedMenuItem={this.onSelectedMenuItem.bind(this)}></SideMenu>
                        {this.state.loading && <Loading/>}
                        { this.state.selectedItem === 1 &&
                            <Overview className={styles.overview} stocksData={this.state.stockData}></Overview>
                        }
                        { this.state.selectedItem === 2 &&
                             <MMM className={styles.mmm} stocksData={this.state.stockData}></MMM>
                        }
                        { this.state.selectedItem === 3 &&
                        <RatiosByFiscalPeriod className={styles.ratiosByFiscalPeriod} stocksData={this.state.stockData}></RatiosByFiscalPeriod>
                        }
                        { this.state.selectedItem === 4 &&
                          <RatiosByCategory className = {styles.ratiosByCategory}
                                            stocksData = {this.state.stockData}
                                            >
                          </RatiosByCategory>
                        }
                        { this.state.selectedItem === 5 &&
                        <BalanceSheet className={styles.balanceSheet} stocksData={this.state.stockData}></BalanceSheet>
                        }
                        { this.state.selectedItem === 6 &&
                        <IncomeStatement className={styles.incomeStatement} stocksData={this.state.stockData}></IncomeStatement>
                        }
                        { this.state.selectedItem === 7 &&
                        <CashflowStatement className={styles.cashflowStatement} stocksData={this.state.stockData}></CashflowStatement>
                        }
                    </div>
                </div>
        );
    }
}

export default StockDetails;
import React, {Component} from 'react';
import CollapsibleBox from './../../../../components/collapsibleBox/CollapsibleBox';
import CheckBox from './../../../../components/checkBox/CheckBox';
import AgGridReact from './../../../../components/dataGrid/DataGrid';
import AccordionV2 from './../../../../components/accordionV2/AccordionV2';
import Header from './../../../../components/header/Header';
import styles from './Stocks.module.scss';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { faShekelSign } from '@fortawesome/free-solid-svg-icons';


class Stocks extends Component {

    constructor(props) {
           super(props);

           this.state = {
                          login: true,
                          registeredUser: (
                                            this.props.location !== undefined &&
                                            this.props.location.state !== undefined &&
                                            this.props.location.state.referrer !== undefined &&
                                            this.props.location.state.referrer.registeredUser !== undefined &&
                                            this.props.location.state.referrer.registeredUser[0] !== undefined
                                          )
                                          ? this.props.location.state.referrer.registeredUser[0]
                                          : undefined,
                          isCollapsedLateralMenu: false,
                          active_columns: [
                                            { headerName: "Symbol", field: "stockName", position: 0},
                                            { headerName: "Moat", field: "moat", position: 1 },
                                            { headerName: "EPS Rating", field: "epsRating", position: 5 },
                                            { headerName: "EPS", field: "eps", position: 18 },
                                            { headerName: "Growth Rate", field: "growthRate", position: 19 },
                                            { headerName: "MOS Price", field: "mosPrice", position: 22 },
                                            { headerName: "Sticker Price", field: "stickerPrice", position: 21 },
                                          ],
                          metrics:  [
                            {headerName: "Symbol", field: "stockName", position: 0},
                            {headerName: "Moat", field: "moat", position: 1},
                            {headerName: "MGT", field: "mgt", position: 2},
                            {headerName: "Predictability", field: "predictability", position: 3},
                            {headerName: "BVPS Rating", field: "bvpsRating", position: 4},
                            {headerName: "EPS Rating", field: "epsRating", position: 5},
                            {headerName: "OCPS Rating", field: "ocpsRating", position:  6},
                            {headerName: "Sales Rating", field: "salesRating",position:  7},
                            {headerName: "Roic Rating", field: "roicRating", position:  8},
                            {headerName: "Roe Rating", field: "roeRating", position:  9},
                            {headerName: "Closing Price", field: "closingPrice", position:  10},
                            {headerName: "Market Cap", field: "marketCap", position: 11},
                            {headerName: "52 Week Low", field: "fiftyTwoWeekLow", position: 12},
                            {headerName: "52 Week High", field: "fiftyTwoWeekHigh", position: 13},
                            {headerName: "50 Day Average", field: "fiftyDayAverage", position: 14},
                            {headerName: "200 Day Average", field: "twoHundredDayAverage", position: 15},
                            {headerName: "Volume", field: "volume", position: 16},
                            {headerName: "Beta", field: "beta", position: 17},
                            {headerName: "EPS", field: "eps", position: 18},
                            {headerName: "Growth Rate", field: "growthRate", position: 19},
                            {headerName: "P/E", field: "pe", position: 20},
                            {headerName: "Sticker Price", field: "stickerPrice", position: 21},
                            {headerName: "MOS Price", field: "mosPrice", position: 22},
                            {headerName: "PBT", field: "pbt", position: 23},
                            {headerName: "Div. Recent Quarter", field: "divRecentQuarter", position: 24},
                            {headerName: "Div. Per Share", field: "divPerShare", position:  25},
                            {headerName: "Div. Yield (%)", field: "divYield", position:  26},
                           ],
                         data: []
                        };
         /*fetch('http://127.0.0.1:3000/api/v1/stocks/all/')
             .then(response => {
                                 console.log(response.json());
                               })
             .then(data => {
                             console.log(data)
                           })
             .catch(error => {
                                 console.log(error);
                             }); */
             //this.getStocks();


    }

    async getStocks(callback = null) {
        const userRegistered = this.props.location.state;
        axios.defaults.withCredentials = true;
        const res = await axios({
                                  method: 'post',
                                  url: 'http://127.0.0.1:3000/api/v1/stocks/all/',
                                  //url: 'https://57407d327847.ngrok.io/api/v1/stocks/all/',
                                  data: {
                                    userRegistered: userRegistered
                                  }
                                  //withCredentials: true
                               });
        if(res.data.status === 'success') {
                let stocksData = res.data.stocks.map(function(actualStock) {
                    let stock = {};
                    stock.stockName = `${actualStock.symbol} - ${actualStock.company}`;
                    stock.moat = actualStock.moat;
                    stock.mgt  = actualStock.mgt;
                    stock.predictability = actualStock.predictability;
                    stock.bvpsRating = actualStock.bvpsRating;
                    stock.epsRating = actualStock.epsRating;
                    stock.ocpsRating = actualStock.ocpsRating;
                    stock.salesRating = actualStock.salesRating;
                    stock.roicRating = actualStock.roicRating;
                    stock.roeRating = actualStock.roeRating;
                    stock.closingPrice = actualStock.closePrice;
                    stock.marketCap = actualStock.marketCap;
                    stock.fiftyTwoWeekLow = actualStock.low52Week;
                    stock.fiftyTwoWeekHigh = actualStock.high52Week;
                    stock.fiftyDayAverage = actualStock.avg50Day;
                    stock.twoHundredDayAverage = actualStock.avg200Day;
                    stock.volume = actualStock.volume;
                    stock.beta = actualStock.beta;
                    stock.growthRate = actualStock.growthRate;
                    stock.eps = actualStock.eps;
                    stock.pe = actualStock.pe;
                    stock.stickerPrice = actualStock.stickerPrice;
                    stock.mosPrice = actualStock.mos;
                    stock.pbt = actualStock.pbt;
                    stock.divRecentQuarter = actualStock.divRecentQtr;
                    stock.divPerShare = actualStock.divPerShare;
                    stock.divYield = actualStock.divYield;
                    return stock;
                });

                if(callback !== null) {
                    callback(stocksData);
                } else {
                    this.setState({
                        data:stocksData
                      });
                }

                if(this.state.registeredUser === undefined &&
                    res.data.registeredUser !== undefined
                  ) {
                      this.setState({
                                     registeredUser: res.data.registeredUser
                                    });
                    }


                console.log('success', `${res.data.stocks} updated successfully!`);
        } else if(res.data.status === 'notLogin') {
            this.setState({login:false});
        }
        console.log("prueba 1");
    }

    componentDidMount() {

    }

    // Update metrics state
    changeMetricStatus = (field,status) => {

        let metrics = this.state.metrics;
        let active_columns = this.state.active_columns;
        let posColumnActive = this.findMetric(active_columns,field);

        if(status === true) {
            if(posColumnActive === -1) {
                let posMetric = this.findMetric(this.state.metrics,field);
                if(posMetric !== -1) {
                    let i = metrics[posMetric].position;
                    if(i < active_columns.length) {
                        active_columns.splice(i, 0, metrics[posMetric]);
                    } else {
                        active_columns.push(metrics[posMetric]);
                    }

                }
            }
        } else {
            if(posColumnActive !== -1) {
                active_columns.splice(posColumnActive,1);
            }
        }

        //console.log(active_columns);
        active_columns = this.resetPositionColumns(active_columns);
        this.setState({active_columns:active_columns});

    }

    resetPositionColumns(activeColumns) {
       for(let i=0; i < activeColumns.length; i++) {
           let pos = this.findMetric(this.state.metrics,activeColumns[i].field);
           if(pos >= 0) {
               activeColumns[i].position = this.state.metrics[pos].position;
           }
       }

       return activeColumns;
    }

    findMetric(arrMetrics,field) {
        let i = arrMetrics.findIndex((metric) => {
            return (metric.field === field);
        });

        return i;
    }

    notifyChangeCollapsedState(isCollapsedLateralMenu) {
       this.setState({isCollapsedLateralMenu: isCollapsedLateralMenu});
    }

    render() {
        let username = "";
        if(!this.state.login) {
            return (<Redirect to={'/login'} />);
        }
        let arrData = [];
        let metricsRuleNumerOneScore = [
                                        <CheckBox cbText={"MOAT"} cbField={"moat"} key={1} changeEstatus={this.changeMetricStatus}/>,
                                        <CheckBox cbText={"MGT"} cbField={"mgt"} key={2}  changeEstatus={this.changeMetricStatus}/>,
                                        <CheckBox cbText={"Predictability"} cbField={"predictability"} key={3} changeEstatus={this.changeMetricStatus} />,
                                        <CheckBox cbText={"BVPS Rating"} cbField={"bvpsRating"} key={4} changeEstatus={this.changeMetricStatus} />,
                                        <CheckBox cbText={"EPS Rating"} cbField={"epsRating"} key={5} changeEstatus={this.changeMetricStatus} />,
                                        <CheckBox cbText={"OCPS Rating"} cbField={"ocpsRating"} key={6} changeEstatus={this.changeMetricStatus} />,
                                        <CheckBox cbText={"Sales Rating"} cbField={"salesRating"} key={7} changeEstatus={this.changeMetricStatus} />,
                                        <CheckBox cbText={"ROIC Rating"} cbField={"roicRating"} key={8} changeEstatus={this.changeMetricStatus} />,
                                        <CheckBox cbText={"ROE Rating"} cbField={"roeRating"} key={9} changeEstatus={this.changeMetricStatus} />,
                                      ];
        let metricsPrice = [
                            <CheckBox cbText={"Closing Price"} cbField={"closingPrice"} key={10} changeEstatus={this.changeMetricStatus} />,
                            <CheckBox cbText={"Market Cap"} cbField={"marketCap"} key={11} changeEstatus={this.changeMetricStatus} />,
                            <CheckBox cbText={"52 Week Low"} cbField={"fiftyTwoWeekLow"} key={12} changeEstatus={this.changeMetricStatus} />,
                            <CheckBox cbText={"52 Week High"} cbField={"fiftyTwoWeekHigh"} key={13} changeEstatus={this.changeMetricStatus} />,
                            <CheckBox cbText={"50 Day Average"} cbField={"fiftyDayAverage"} key={14} changeEstatus={this.changeMetricStatus} />,
                            <CheckBox cbText={"200 Day Average"} cbField={"twoHundredDayAverage"} key={15}  changeEstatus={this.changeMetricStatus} />,
                            <CheckBox cbText={"Volume"} cbField={"volume"} key={16}  changeEstatus={this.changeMetricStatus} />,
                            <CheckBox cbText={"Beta"} cbField={"beta"} key={17} changeEstatus={this.changeMetricStatus} />,
                          ];
        let metricsValuation = [
                                  <CheckBox cbText={"EPS"} cbField={"eps"} key={18} changeEstatus={this.changeMetricStatus} />,
                                  <CheckBox cbText={"Growth Rate"} cbField={"growthRate"} key={19} changeEstatus={this.changeMetricStatus} />,
                                  <CheckBox cbText={"P/E"} cbField={"pe"} key={20} changeEstatus={this.changeMetricStatus}/>,
                                  <CheckBox cbText={"Sticker Price"} cbField={"stickerPrice"} key={21} changeEstatus={this.changeMetricStatus} />,
                                  <CheckBox cbText={"MOS Price"} cbField={"mosPrice"} key={22} changeEstatus={this.changeMetricStatus} />,
                                  <CheckBox cbText={"PBT"} cbField={"pbt"} key={23} changeEstatus={this.changeMetricStatus} />,
                              ];
        let metricDividend = [
                                <CheckBox cbText={"Div. Recent Quarter"} cbField={"divRecentQuarter"} key={24} changeEstatus={this.changeMetricStatus} />,
                                <CheckBox cbText={"Div. Per Share"} cbField={"divPerShare"} key={25} changeEstatus={this.changeMetricStatus} />,
                                <CheckBox cbText={"Div. Yield (%)"} cbField={"divYield"} key={26} changeEstatus={this.changeMetricStatus} />,
                            ];
        let metricExchange = [
                              <CheckBox cbText={"NYSE"} cbField={"nyse"} key={27} changeEstatus={this.changeMetricStatus} />,
                              <CheckBox cbText={"Nasdaq"} cbField={"nasdaq"} key={28} changeEstatus={this.changeMetricStatus} />,
                              <CheckBox cbText={"AMEX"} cbField={"amex"} key={29} changeEstatus={this.changeMetricStatus} />,
                              <CheckBox cbText={"TSX"} cbField={"tsx"} key={30} changeEstatus={this.changeMetricStatus} />,
                            ];
        arrData[0] = { headerText: "Rule #1 Score",  metrics: metricsRuleNumerOneScore };
        arrData[1] = { headerText:"Price",  metrics: metricsPrice };
        arrData[2] = { headerText:"Valuation",  metrics: metricsValuation };
        arrData[3] = { headerText: "Dividend",  metrics: metricDividend };
        arrData[4] = { headerText:"Exchange",  metrics: metricExchange };
        let colors = {};
        let headerStyles = {};
        headerStyles.stockName = {};
        headerStyles.searchInput = {};


        colors.backgroundColor = '#1e2337';
        colors.headerColor = '#34495e';
        colors.titleColor = '#e29402';

        headerStyles.stockName.marginLeft = '5rem';
        headerStyles.searchInput.marginLeft = '-1.8rem';
        if(window.innerWidth > 375 && window.innerWidth <= 900) {
            headerStyles.searchInput.marginLeft = '-7.8rem';
        }
        //this.refs.agGrid.api.refreshCells();
        if(this.state.registeredUser !== undefined) {
            if('username' in this.state.registeredUser) {
                username = this.state.registeredUser.username;
            } else if('name' in this.state.registeredUser) {
                username = this.state.registeredUser.name;
            }
        }

        return (
          <div className={styles.container}>
              <Header className={styles.header}
                      stockName="STOCKS ANALYSIS APP  "
                      userName={username}
                      headerStyles={headerStyles}>
              </Header>
              <div className = {styles.main}>
                    <CollapsibleBox onClick={this.notifyChangeCollapsedState.bind(this)}>
                        <AccordionV2 data={arrData}
                                     colors={colors}
                                     metrics={this.state.metrics}
                        >
                        </AccordionV2>
                    </CollapsibleBox>

                    <AgGridReact
                            //ref="agGrid"
                            columnDefs={this.state.active_columns}
                            rowData={this.state.data}
                            data={this.getStocks.bind(this)}
                            width={this.state.isCollapsedLateralMenu ? '550rem' : '50rem'}
                    >
                    </AgGridReact>
              </div>
         </div>

        )
    }
}

export default Stocks;

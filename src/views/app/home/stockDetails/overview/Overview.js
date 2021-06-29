import React, { Component } from 'react';
import Card from './../../../../../components/card/Card';
import styles from './Overview.module.scss';

class Overview extends Component {

    constructor(props) {

        super(props);
        this.state = {
             stocksData: this.props.stocksData,
             overview: this.props.stocksData.overview,
        };
    }

    render () {
          return (
                <div className={styles.container}>
                    <Card metricName = {"Symbol"}
                          metricValue = {(this.state.overview != null)
                                         ? this.state.overview.symbol
                                         : ''}
                    />
                    <Card metricName = {"Company Name"}
                          metricValue = {(this.state.overview != null)
                                         ? this.state.overview.name
                                         : ''
                                        }
                    />
                    <Card metricName = {"Market Cap."}
                          metricValue = {(this.state.overview != null)
                                         ? this.state.overview.marketCap
                                         : ''
                                        }
                    />
                    <Card metricName = {"Price"}
                          metricValue = {(this.state.overview != null)
                                         ?`$ ${this.state.overview.price}`
                                         : ''
                                        }
                    />
                    <Card metricName = {"Price Avg 50"}
                          metricValue = {(this.state.overview != null)
                                         ? this.state.overview.priceAvg50
                                         : ''
                                        }
                                         />
                    <Card metricName = {"Price Avg 200"}
                          metricValue = {(this.state.overview != null)
                                         ? this.state.overview.priceAvg200
                                         : ''
                                        }
                    />
                    <Card metricName = {"Volume"}
                          metricValue = {(this.state.overview != null)
                                         ? this.state.overview.volume
                                         : ''
                                        }
                    />
                    <Card metricName = {"EPS"}
                          metricValue = {(this.state.overview != null)
                                         ? this.state.overview.eps
                                         : ''
                                        }
                    />
                    <Card metricName = {"PE"}
                          metricValue = {(this.state.overview != null)
                                         ? this.state.overview.pe
                                         : ''
                                        }
                    />
                    <Card metricName = {"Exchange"}
                          metricValue = {(this.state.overview != null)
                                         ? this.state.overview.exchange
                                         : ''
                                        }/>
                </div>
          );
    }
}

export default Overview;
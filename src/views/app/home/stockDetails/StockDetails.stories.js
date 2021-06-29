import React from 'react';
import StockDetails from './StockDetails';
import styles from './StockDetails.module.scss';

export default {
    title: 'Components/StockDetails',
    component: StockDetails,
}

export const Primary = () => {
                               let symbol = "BYD:CA";
                               return (
                                    <div className={styles.main}>
                                        <StockDetails symbol={symbol}></StockDetails>
                                    </div>
                               );
                             }
import React from 'react';
import Header from './Header';
//import styles from './CheckBox.module.scss';

export default {
    title: 'Components/Header',
    component: Header,
}

export const Primary = () => {
                               let stockName = 'APPL';
                               let userName  = 'lcarcases';
                               return (
                                    <div>
                                        <Header stockName={stockName} userName={userName}></Header>
                                    </div>
                               );
                             }

import React from 'react';
import Card from './Card';
import styles from './Card.module.scss';

export default {
    title: 'Components/Card',
    component: Card,
}

export const Primary = () => {
                               let metricName = "Price:";
                               let metricValue = "$ 13.46"
                               return (
                                    <div className={styles.container}>
                                        <Card metricName={metricName} metricValue={metricValue}></Card>
                                    </div>
                               );
                             }

export const Secondary = () => {
                                let metricName = "Price:";
                                let metricValue = "$ 13245.436"
                                return (
                                     <div className={styles.container}>
                                         <Card metricName={metricName} metricValue={metricValue}></Card>
                                     </div>
                                );
                              }

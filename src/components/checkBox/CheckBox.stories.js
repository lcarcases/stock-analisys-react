import React from 'react';
import CheckBox from './CheckBox';
import styles from './CheckBox.module.scss';

export default {
    title: 'Components/CheckBox',
    component: CheckBox,
}

export const Primary = () => {
                               let metric = "MOAT";
                               return (
                                    <div className={styles.container}>
                                        <CheckBox cbText={metric}></CheckBox>
                                    </div>
                               );
                             }

import React from 'react';
import Search from './Search';
import styles from './Search.module.scss';

export default {
    title: 'Components/Search',
    component: Search,
}

export const Primary = () => {

                               return (
                                    <div className={styles.container}>
                                        <Search></Search>
                                    </div>
                               );
                             }

import React from 'react';
import Login from './Login';
import styles from './Login.module.scss';

export default {
    title: 'Components/Login',
    component: Login,
}

export const Primary = () => {
                               return (
                                    <div className={styles.container}>
                                        <Login />
                                    </div>
                               );
                             }

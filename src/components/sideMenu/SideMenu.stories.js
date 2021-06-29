import React from 'react';
import SideMenu from './SideMenu';
import styles from './SideMenu.module.scss';

export default {
    title: 'Components/SideMenu',
    component: SideMenu,
}

export const Primary = () => {
                               return (
                                   <div className={styles.rootSizeMenu}>
                                       <SideMenu></SideMenu>
                                   </div>
                               );
                             }
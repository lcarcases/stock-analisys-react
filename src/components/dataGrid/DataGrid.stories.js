import React from 'react';
import DataGrid from './DataGrid';
//import styles from './DataGrid.module.scss';

export default {
    title: 'Components/Datagrid',
    component: DataGrid,
}

export const Primary = () => {
                               return (
                                   <div>
                                       <DataGrid></DataGrid>
                                   </div>
                               );
                             }
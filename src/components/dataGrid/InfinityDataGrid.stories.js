import React from 'react';
import InfinityDataGrid from './InfinityDataGrid';
//import styles from './DataGrid.module.scss';

export default {
    title: 'Components/InfinityDatagrid',
    component: InfinityDataGrid,
}

export const Primary = () => {
                               return (
                                   <div>
                                       <InfinityDataGrid></InfinityDataGrid>
                                   </div>
                               );
                             }
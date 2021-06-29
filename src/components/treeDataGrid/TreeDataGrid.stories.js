import React from 'react';
import TreeDataGrid from './TreeDataGrid';
//import styles from './DataGrid.module.scss';

export default {
    title: 'Components/TreeDatagrid',
    component: TreeDataGrid,
}

export const Primary = () => {
                               return (
                                   <div>
                                       <TreeDataGrid></TreeDataGrid>
                                   </div>
                               );
                             }
import React from 'react';
import ServerSideDataGrid from './ServerSideDataGrid';
//import styles from './DataGrid.module.scss';

export default {
    title: 'Components/ServerSideDataGrid',
    component: ServerSideDataGrid,
}

export const Primary = () => {
                               return (
                                   <div>
                                       <ServerSideDataGrid></ServerSideDataGrid>
                                   </div>
                               );
                             }
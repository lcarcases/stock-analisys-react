import React from 'react';
import PaginationDataGrid from './PaginationDataGrid';


export default {
    title: 'Components/PaginationDataGrid',
    component: PaginationDataGrid,
}

export const Primary = () => {
                               return (
                                   <div>
                                       <PaginationDataGrid></PaginationDataGrid>
                                   </div>
                               );
                             }
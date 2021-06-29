import React from 'react';
import Accordion from './Accordion';


export default {
    title: 'Components/Accordion',
    component: Accordion,
}

export const Primary = () => {
                               let arrData = [];
                               arrData[0] = { headerText: "Rule #1 Score" };
                               arrData[1] = { headerText:"Price" };
                               arrData[2] = { headerText:"Valuation" };
                               arrData[3] = { headerText: "Dividend" };
                               arrData[4] = { headerText:"Exchange" };
                               return (
                                  <div>
                                      <Accordion data={arrData}></Accordion>
                                  </div>
                               );
                             }
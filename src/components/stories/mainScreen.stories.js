import React from 'react';
import CollapsibleBox from './../collapsibleBox/CollapsibleBox';
import CheckBox from './../checkBox/CheckBox';
import AgGridReact from './../dataGrid/DataGrid';
import AccordionV2 from './../accordionV2/AccordionV2';
import styles from './mainScreen.module.scss';
//import classNames from 'classnames';

export default {
    title: 'Components/Screens',
    component: Screen
}

export const MainScreen = () => {
                                  return (
                                    <div className={styles.container}>
                                        <CollapsibleBox>
                                                <CheckBox cbText={"MGT"}></CheckBox>
                                                <CheckBox cbText={"EPS Rating"}></CheckBox>
                                                <CheckBox cbText={"ROIC Rating"}></CheckBox>
                                                <CheckBox cbText={"Sales RAting"}></CheckBox>
                                        </CollapsibleBox>
                                        <AgGridReact></AgGridReact>
                                   </div>
                                  )

                                }

export const SecondaryScreen = () => {
                                        let arrData = [];
                                        let metricsRuleNumerOneScore = [
                                                                        <CheckBox cbText={"MOAT"} key={1}/>,
                                                                        <CheckBox cbText={"MGT"} key={2}/>,
                                                                        <CheckBox cbText={"Predictability"} key={3}/>,
                                                                        <CheckBox cbText={"BVPS Rating"} key={4}/>,
                                                                        <CheckBox cbText={"EPS Rating"} key={5}/>,
                                                                        <CheckBox cbText={"OCPS Rating"} key={6}/>,
                                                                        <CheckBox cbText={"Sales Rating"} key={7}/>,
                                                                        <CheckBox cbText={"ROIC Rating"} key={8}/>,
                                                                        <CheckBox cbText={"ROE Rating"} key={9}/>,
                                                                      ];
                                        let metricsPrice = [
                                                            <CheckBox cbText={"Closing Price"} key={10}/>,
                                                            <CheckBox cbText={"Market Cap"} key={11}/>,
                                                            <CheckBox cbText={"52 Week Low"} key={12}/>,
                                                            <CheckBox cbText={"52 Week High"} key={13}/>,
                                                            <CheckBox cbText={"50 Day Average"} key={14}/>,
                                                            <CheckBox cbText={"200 Day Average"} key={15} />,
                                                            <CheckBox cbText={"Volume"} key={16} />,
                                                            <CheckBox cbText={"Beta"} key={17}/>,
                                                          ];
                                        let metricsValuation = [
                                                                  <CheckBox cbText={"EPS"} key={18}/>,
                                                                  <CheckBox cbText={"Growth Rate"} key={19}/>,
                                                                  <CheckBox cbText={"P/E"} key={20}/>,
                                                                  <CheckBox cbText={"Sticker Price"} key={21}/>,
                                                                  <CheckBox cbText={"MOS Price"} key={22}/>,
                                                                  <CheckBox cbText={"PBT"} key={23}/>,
                                                              ];
                                        let metricDividend = [
                                                                <CheckBox cbText={"Div. Recent Quarter"} key={24}/>,
                                                                <CheckBox cbText={"Div. Per Share"} key={25}/>,
                                                                <CheckBox cbText={"Div. Yield (%)"} key={26}/>,
                                                            ];
                                        let metricExchange = [
                                                              <CheckBox cbText={"NYSE"} key={27}/>,
                                                              <CheckBox cbText={"Nasdaq"} key={28}/>,
                                                              <CheckBox cbText={"AMEX"} key={29}/>,
                                                              <CheckBox cbText={"TSX"} key={30}/>,
                                                            ];
                                        arrData[0] = { headerText: "Rule #1 Score",  metrics: metricsRuleNumerOneScore };
                                        arrData[1] = { headerText:"Price",  metrics: metricsPrice };
                                        arrData[2] = { headerText:"Valuation",  metrics: metricsValuation };
                                        arrData[3] = { headerText: "Dividend",  metrics: metricDividend };
                                        arrData[4] = { headerText:"Exchange",  metrics: metricExchange };
                                        let colors = {};

                                        colors.backgroundColor = '#1e2337';
                                        colors.headerColor = '#dee8fe';
                                        colors.titleColor = '#121212';
                                        
                                        return (
                                          <div className={styles.container}>
                                              <CollapsibleBox>
                                                   <AccordionV2 data={arrData} colors={colors}></AccordionV2>
                                              </CollapsibleBox>
                                              <AgGridReact></AgGridReact>
                                         </div>
                                        )
                                     }
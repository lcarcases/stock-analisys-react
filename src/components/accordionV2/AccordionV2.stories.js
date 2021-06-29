import React from 'react';
import CheckBox from './../checkBox/CheckBox';
import AccordionV2 from './AccordionV2';

export default {
    title: 'Components/AccordionV2',
    component: AccordionV2
}

export const Primary = () => {
                              const paragraph = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet natus sint provident vel ab reprehenderit cum soluta, suscipit facere nisi sed earum repellendus fuga debitis, nam molestiae minima voluptates possimus.";

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
                              arrData[0] = { headerText: "Rule #1 Score", paragraph: paragraph, metrics: metricsRuleNumerOneScore };
                              arrData[1] = { headerText:"Price", paragraph: paragraph, metrics: metricsPrice };
                              arrData[2] = { headerText:"Valuation", paragraph: paragraph, metrics: metricsValuation };
                              arrData[3] = { headerText: "Dividend", paragraph: paragraph, metrics: metricDividend };
                              arrData[4] = { headerText:"Exchange", paragraph: paragraph, metrics: metricExchange };
                              return (
                                  <AccordionV2 data={arrData}></AccordionV2>
                              );
                             }

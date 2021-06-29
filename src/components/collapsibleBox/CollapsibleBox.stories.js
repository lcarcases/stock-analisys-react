import React from 'react';
import CollapsibleBox  from './CollapsibleBox';
//import styles from './../checkBox/CheckBox.module.scss';
import styles from './styles.module.scss';
import CheckBox from './../checkBox/CheckBox';

export default {
    title: 'Components/CollapsibleBox',
    component: CollapsibleBox
}

export const Primary = () => {
                              return(
                                    <div className={styles.container}>
                                        <CollapsibleBox>
                                                <CheckBox cbText={"MGT"}></CheckBox>
                                                <CheckBox cbText={"EPS Rating"}></CheckBox>
                                                <CheckBox cbText={"ROIC Rating"}></CheckBox>
                                                <CheckBox cbText={"Sales RAting"}></CheckBox>
                                        </CollapsibleBox>
                                    </div>
                              );
                             }
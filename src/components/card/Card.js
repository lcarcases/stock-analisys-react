import React, { Component } from 'react';
import styles from './Card.module.scss';

class Card extends Component {

     constructor(props) {
          super(props);
          this.state = {
                metricName: this.props.metricName,
                metricValue:  this.props.metricValue,
                primaryColorGradient: (this.props.primaryColorGradient !== undefined) ? this.props.primaryColorGradient : undefined,
                secondaryColorGradient: (this.props.secondaryColorGradient !== undefined) ? this.props.secondaryColorGradient : undefined
          };
     }

     render() {
         /*return (
             <div className={styles.card}>
                 <p className={styles.card_metric}>{this.state.metricName}</p>
                 <p className={styles.card_value}>{this.state.metricValue}</p>
             </div>
         ); */

         return (
                <div className={styles.newCard}>
                     <header className={styles.newCard_header}>
                        <h1 className={styles.newCard_header_title}>{this.state.metricName}</h1>
                     </header>
                     <div className={styles.newCard_body}>
                          <h1 className={styles.newCard_body_value}>{this.state.metricValue}</h1>
                     </div>
                </div>
         );
     }
}

export default Card;
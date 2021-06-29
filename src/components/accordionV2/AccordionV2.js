import React, { Component } from 'react';
import styles from './accordionV2.module.scss';


class AccordionV2 extends Component {

    constructor(props) {
      super(props);
      this.state = {
        data: this.props.data,
        metrics: this.props.metrics,
        backgroundColor: this.props.colors.backgroundColor ? this.props.colors.backgroundColor : '#ffff',
        headerColor: this.props.colors.headerColor ? this.props.colors.headerColor : '#34495e',
        titleColor:  this.props.colors.titleColor ? this.props.colors.titleColor : '#000',
        onClick: this.props.onClick,
      }
    }



    render() {

        return (
            <div {...{ className: styles.wrapper }}>
                <ul {...{ className: styles.accordion_list }} style={{backgroundColor: this.state.backgroundColor}}>
                {this.state.data.map((data, key) => {
                    return (
                    <li {...{ className: styles.accordion_list__item, key }}>
                        <AccordionItem {...data} colors={this.props.colors}/>
                    </li>
                    )
                })}
                </ul>
          </div>
        )

    }
}

class AccordionItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      opened: false,
      headerColor: this.props.colors.headerColor ? this.props.colors.headerColor : '#34495e',
      titleColor:  this.props.colors.titleColor ? this.props.colors.titleColor : '#000',
    };
  }


    render() {
      const {
              props: { headerText, metrics },
              state: { opened }
            } = this;

      return (
        <div
          {...{
            className: `${styles.accordion_item}, ${opened && styles.accordion_item__opened}`
          }}
        >
          <div {...{ className: styles.accordion_item__line,
                     onClick: () => {
                               this.setState({ opened: !opened });
                     }
                   }} style={{backgroundColor: this.state.headerColor}}>
            <h3 {...{ className: styles.accordion_item__title }} style={{color: this.state.titleColor}}>{headerText}</h3>
            <span {...{ className: styles.accordion_item__icon }}
            />
          </div>
          <div {...{ className: styles.accordion_item__inner }}>
            <div {...{ className: styles.accordion_item__content }}>
              { metrics.map((metric, key) => {
                    return (
                       metric
                    )
                })
              }
            </div>
          </div>
        </div>
      );
    }
  }


export default AccordionV2;
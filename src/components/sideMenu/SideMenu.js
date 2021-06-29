import React, { Component } from 'react';
import styles from './SideMenu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faTable } from '@fortawesome/free-solid-svg-icons';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faBookReader } from '@fortawesome/free-solid-svg-icons';
//import { NavigationLink } from 'react-router-dom';
import classNames from 'classnames';

class SideMenu extends Component{

    constructor(props) {
        super(props);

        this.state = {
                       selectedItem: -1,
                       onSelectMenuItem: props.onSelectedMenuItem,
                       //sideMenuStyles: props.sideMenuStyles,
                     };
    }

    onSelectMenuItem = (i,event) => {
        this.state.onSelectMenuItem(i);
        this.setState({selectedItem: i});

    }

    render() {

        const { selectedItem } = this.state;

        return (
              <div {...{className:styles.menu}} style={{height:this.props.sideMenuStyles.height}}>
                  <div className={ (selectedItem === 1) ? styles.menu__item__selected : styles.menu__item} key={1} onClick={this.onSelectMenuItem.bind(this,1)}>
                       <FontAwesomeIcon className={styles.menu__item__icon} icon={faTachometerAlt} />
                       <span className={styles.menu__item__text}>Overview</span>
                       {/*<NavigationLink className={styles.menu__item__text} to='/overview'>Overview</NavigationLink>*/}
                  </div>
                  <div className={(selectedItem === 2) ? styles.menu__item__selected : styles.menu__item} key={2} onClick={this.onSelectMenuItem.bind(this,2)}>
                       <FontAwesomeIcon className={styles.menu__item__icon} icon={faTable} />
                       <span className={styles.menu__item__text}>MMM</span>
                       {/*<NavigationLink className={styles.menu__item__text} to='/mmm'>MMM</NavigationLink>*/}
                  </div>
                  <div className={(selectedItem === 3) ? styles.menu__item__selected : styles.menu__item} key={3} onClick={this.onSelectMenuItem.bind(this,3)}>
                       <FontAwesomeIcon className={styles.menu__item__icon} icon={faCalendarAlt}/>
                       <span className={styles.menu__item__text}>Ratios By Fiscal Period</span>
                       {/*<NavigationLink to='/ratios-by-fiscal-period'>Ratios By Fiscal Period</NavigationLink>*/}
                  </div>
                  <div className={(selectedItem === 4) ? styles.menu__item__selected : styles.menu__item} key={4} onClick={this.onSelectMenuItem.bind(this,4)}>
                       <FontAwesomeIcon className={styles.menu__item__icon} icon={faChartLine} onClick={this.onSelectMenuItem}/>
                       <span className={styles.menu__item__text}>Ratios By Category</span>
                       {/*<NavigationLink className={styles.menu__item__text} to='/ratios-by-category'>Ratios By Category</NavigationLink>*/}
                  </div>
                  <div className={(selectedItem === 5) ? styles.menu__item__selected : styles.menu__item} key={5} onClick={this.onSelectMenuItem.bind(this,5)}>
                       <FontAwesomeIcon className={styles.menu__item__icon} icon={faBook} />
                       <span className={styles.menu__item__text}>Balance Sheet</span>
                       {/*<NavigationLink className={styles.menu__item__text} to='/balance-sheet'>Balance Sheet</NavigationLink>*/}
                  </div>
                  <div className={(selectedItem === 6) ? styles.menu__item__selected : styles.menu__item} key={6} onClick={this.onSelectMenuItem.bind(this,6)}>
                       <FontAwesomeIcon className={styles.menu__item__icon} icon={faBookOpen} />
                       <span className={styles.menu__item__text}>Income Statement</span>
                       {/*<NavigationLink className={styles.menu__item__text} to='/income-statement'>Income Statement</NavigationLink>*/}
                  </div>
                  <div className={(selectedItem === 7) ? styles.menu__item__selected : styles.menu__item} key={7} onClick={this.onSelectMenuItem.bind(this,7)}>
                       <FontAwesomeIcon className={styles.menu__item__icon} icon={faBookReader} />
                       <span className={styles.menu__item__text}>Cashflow Statement</span>
                  </div>
              </div>
        );
    }
}

export default SideMenu;
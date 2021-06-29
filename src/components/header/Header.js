import React, { Component } from 'react';
import Search from './../search/Search';
import avatar from './../../assets/images/empty-avatar.jpg';
import styles from './Header.module.scss';

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stockName: this.props.stockName,
            userName: this.props.userName,
            stockNameMarginLeft: ( this.props.headerStyles !== undefined &&
                                   this.props.headerStyles.stockName.marginLeft)
                                 ? this.props.headerStyles.stockName.marginLeft
                                 : '3rem',
            searchInputMarginLeft: ( this.props.headerStyles !== undefined &&
                                     this.props.headerStyles.searchInput.marginLeft
                                   )
                                   ? this.props.headerStyles.searchInput.marginLeft
                                   : '5rem',
            /*headerWidth: ( this.props.headerStyles !== undefined &&
                           this.props.headerStyles.header !== undefined &&
                           this.props.headerStyles.header.width
                         )
                         ? this.props.headerStyles.header.width
                         : '5rem', */
        }
    }

    render() {

        return (
                 <div className={styles.header}>
                    <div {...{ className:styles.stockName}} style={{marginLeft: this.state.stockNameMarginLeft}}>
                      <h2><span >{this.props.stockName}</span></h2>
                    </div>
                    <div {...{className:styles.searchComponent}} style={{marginLeft: this.state.searchInputMarginLeft}}>
                       <Search />
                    </div>
                    <div className={styles.user}>
                      <h2><span className={styles.user__name}>{this.props.userName ? this.props.userName: "" }</span></h2>
                      <img className={styles.user__avatar} src={avatar} alt='avatar'/>
                    </div>
                 </div>
        );
    }
}

export default Header;
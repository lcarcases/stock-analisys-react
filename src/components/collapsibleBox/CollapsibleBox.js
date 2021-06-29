import React, { Component } from 'react';
import styles from './styles.module.scss';
//import './styles.module.scss';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';



class CollapsibleBox extends Component {

    constructor(props) {
        super(props);
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state = {
            collapsed: false,
            notifyChangeCollapsedState: this.props.onClick
        };
    }

    onBarIconClick(event) {
        this.state.notifyChangeCollapsedState(!this.state.collapsed);
         this.setState({collapsed: !this.state.collapsed});
         console.log(event);
         console.log(this.state.collapsed);
    }

    render() {

        const collapsibleStyle = classNames(
                                            { [styles.collapsible]: !this.state.collapsed},
                                            { [styles.collapsible__collapsed]: this.state.collapsed },
                                           );
        const toogleBarStyle = classNames(
                                            { [styles.toogle_bar]: !this.state.collapsed},
                                            { [styles.toogle_bar__collapsed]: this.state.collapsed },
                                         );

        const toogleBarIconStyle = classNames(
                                                { [styles.toogle_bar_icon]: !this.state.collapsed},
                                                { [styles.toogle_bar_icon_collapsed]: this.state.collapsed },
                                             );


        return (
            <div className={styles.sidebar}>
                <div className={toogleBarStyle} onClick={this.onBarIconClick.bind(this)}>
                    <FontAwesomeIcon icon={faBars} className={toogleBarIconStyle}/>
                </div>
                <div className={collapsibleStyle}>
                    <div className={styles.collapsible_header}>
                        <FontAwesomeIcon className={styles.collapsible_header_icon} icon={faUniversity} />
                        {/*<h1 className={styles.collapsible_header_appName}>Stock<span className={styles.collapsible_header_appName_highlighted}> Analysis </span> App</h1>*/}
                    </div>
                    <div className={styles.collapsible_content}>
                        {this.props.children}
                    </div>
                </div>
            </div>

        );
    }
}

export default CollapsibleBox;
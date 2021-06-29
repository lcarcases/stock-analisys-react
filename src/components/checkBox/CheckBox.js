import React, { Component } from 'react';
import styles from './CheckBox.module.scss';



class CheckBox extends Component {

    constructor(props) {

        super(props);
        //this.onClick = this.onClick.bind(this);
        this.state = {
            active: false,
            cbText: this.props.cbText,
            cbField: this.props.cbField,
        };
    }

    onChangeState = (event) => {
        let i = 0;
        //this.setState({active: !this.state.active});
        this.setState({ active: !this.state.active }, () => {
            this.props.changeEstatus(this.state.cbField,this.state.active);
          });
        //this.props.changeEstatus(this.state.cbText,this.state.active);

    }

    render() {
         return (
            <div className={styles.cb_container}>
                <input className={styles.cb} type="checkbox" onChange={this.onChangeState} />
                <label htmlFor={styles.cb} className={styles.cb_trail}>
                    <span className={styles.cb_trail_handler}></span>
                </label>
                <p className={styles.cb_container_text}>{this.state.cbText}</p>
            </div>
         );
    }
}

export default CheckBox;
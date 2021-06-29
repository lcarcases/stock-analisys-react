import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './Accordion.module.scss';
//import classNames from 'classnames';


class Accordion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
        }

        this.accordionContainer = React.createRef();
    }

    componentDidMount() {
        const accordion = ReactDOM.findDOMNode(this);
        const accordionBtns = accordion.querySelectorAll('.Accordion_accordion__2KI2g');

        for(let i=0; i < accordionBtns.length; i++) {

            accordionBtns[i].addEventListener("click", function() {
                this.classList.toggle("active");

                let panel = this.nextElementSibling;
                if (panel.style.maxHeight !== "" && panel.style.maxHeight !=="0rem") {
                    panel.style.maxHeight = "0rem";
                    panel.style.transition = "0.4s ease-out";
                    panel.style.overflow = "hidden";
                } else {
                    panel.style.transition = "0.4s ease-out";
                    panel.style.display = "block";
                    panel.style.maxHeight = panel.scrollHeight + "rem";
                    //panel.style.maxHeight = "30rem";
                }
            });
        }
    }

    render() {
        /*let accordion_styles = classNames({
            'accordion' : true,
            'active': false,
        }); */
        return (
           <div ref={this.accordionContainer}>
               <button className={styles.accordion}>{this.state.data[0].headerText}</button>
               <div className={styles.accordion_panel}>
                   <p>metric 0.1</p>
                   <p>metric 0.2</p>
                   <p>metric 0.3</p>
                   <p>metric 0.4</p>
                   <p>metric 0.5</p>
                   <p>metric 0.6</p>
                   <p>metric 0.7</p>
                   <p>metric 0.8</p>
               </div>
               <button className={styles.accordion}>{this.state.data[1].headerText}</button>
               <div className={styles.accordion_panel}>
                   <p>metric 1.1</p>
                   <p>metric 1.2</p>
                   <p>metric 1.3</p>
                   <p>metric 1.4</p>
                   <p>metric 1.5</p>
                   <p>metric 1.6</p>
                   <p>metric 1.7</p>
                   <p>metric 1.8</p>
               </div>
               <button className={styles.accordion}>{this.state.data[2].headerText}</button>
               <div className={styles.accordion_panel}>
                   <p>metric 2.1</p>
                   <p>metric 2.2</p>
                   <p>metric 2.3</p>
                   <p>metric 2.4</p>
                   <p>metric 2.5</p>
                   <p>metric 2.6</p>
               </div>
               <button className={styles.accordion}>{this.state.data[3].headerText}</button>
               <div className={styles.accordion_panel}>
                   <p>metric 3.1</p>
                   <p>metric 3.2</p>
                   <p>metric 3.3</p>
               </div>
               <button className={styles.accordion}>{this.state.data[4].headerText}</button>
               <div className={styles.accordion_panel}>
                   <p>metric 4.1</p>
                   <p>metric 4.2</p>
                   <p>metric 4.3</p>
                   <p>metric 4.4</p>
               </div>
           </div>
        );
    }


}

export default Accordion;
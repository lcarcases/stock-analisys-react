import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import styles from './Search.module.scss';

class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searching: "",
            redirect: null,
        }
    }

    handleChange(event) {
       let stock = event.target.value;
       this.setState({searching: stock});
    }

    searchButtonClick(event) {
        if(this.state.searching.length > 0) {
            this.setState({redirect: `/stock-details/${this.state.searching}`});
        } else {
            this.setState({redirect: null});
        }
    }

    render() {
         if (this.state.redirect !== null) {
            let redirect = this.state.redirect;
            this.setState({redirect: null});
            return (<Redirect to={redirect} />);
         }
        return (
                 <div>
                    <div className={styles.search}>
                     <input type="text" placeholder="Search.." name="searchText" onChange={this.handleChange.bind(this)}></input>
                     <button type="submit" className={styles.searchButton} onClick={this.searchButtonClick.bind(this)}><FontAwesomeIcon icon={faSearch} /></button>
                    </div>
                 </div>
        );
    }
}

export default Search;
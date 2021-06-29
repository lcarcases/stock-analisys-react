import React, { Component } from 'react';
import styles from './NotFound.module.scss';

class NotFound extends Component {

    render() {
        return (
           <div>
               <h2>Pagina no encontrada</h2>
               <p>La página a la que intentas ingresar no se encuentra</p>
           </div>
        );
    }
}

export default NotFound;
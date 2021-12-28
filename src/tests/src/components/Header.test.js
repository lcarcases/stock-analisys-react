import React from 'react';
import '@testing-library/jest-dom'
import { shallow } from 'enzyme'

import Header from '../../../components/header/Header';


describe('Pruebas Header', () => {
    
    test('debe de mostrar <Header /> correctamente', () => {

        

        const test = true;
        const username = 'lcarcases4';
        const stockName = "STOCKS ANALYSIS APP  ";

        let headerStyles = {};
        headerStyles.stockName = {};
        headerStyles.searchInput = {};

        headerStyles.stockName.marginLeft = '5rem';
        headerStyles.searchInput.marginLeft = '-1.8rem';
        if(window.innerWidth > 375 && window.innerWidth <= 900) {
            headerStyles.searchInput.marginLeft = '-7.8rem';
        }

        const wrapper = shallow(<Header className="header"
                                        stockName={stockName}
                                        userName={username}
                                        headerStyles={headerStyles}>
                                </Header>
                               );

        expect( wrapper ).toMatchSnapshot();
        
    });

    test('debe de mostrar el subtitulo enviado por props', () => {
        
        const p = "1234";

        const test = true;
        const username = 'lcarcases4';
        const stockName = "STOCKS ANALYSIS APP  ";

        let headerStyles = {};
        headerStyles.stockName = {};
        headerStyles.searchInput = {};

        headerStyles.stockName.marginLeft = '5rem';
        headerStyles.searchInput.marginLeft = '-1.8rem';
        if(window.innerWidth > 375 && window.innerWidth <= 900) {
            headerStyles.searchInput.marginLeft = '-7.8rem';
        }

        const wrapper = shallow(<Header className="header"
                                        stockName={stockName}
                                        userName={username}
                                        headerStyles={headerStyles}>
                                </Header>
                               );

        const spanText = wrapper.find('span').first().text();
        
        expect( spanText ).toBe( stockName );

    })
    
    
    

})
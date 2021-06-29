import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Stocks from './views/app/home/stocks/Stocks';
import StockDetails from './views/app/home/stockDetails/StockDetails';
import Error from './views/app/notFound/NotFound';
import Login from './views/app/login/Login';

class Router extends Component {

    render() {
         return (
             <BrowserRouter>

                {/* Routes Configuration */}
                <Switch>
                    <Route exact path="/" component={Stocks} />
                    <Route exact path="/stocks" component={Stocks} />
                    <Route exact path="/stock-details/:stock" component={StockDetails} />
                    <Route exact path="/login" component={Login} />

                    <Route component={Error} />
                </Switch>

             </BrowserRouter>
         );
    }
}

export default Router;
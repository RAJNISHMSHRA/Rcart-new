import React,{Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {createHashHistory} from 'history';
import PushProduct from './Products/addProduct'
import store from '../store/store';
import Home from '../components/home';
import Detail from './detail'
import Cart from './cart'

let history = createHashHistory();

class Routes extends Component {    
    render() {
        return (
            <ConnectedRouter store={store} history={history}>
            <Switch>
                <Route component={Home} exact={true} path={'/'}/>
                <Route path={'/details/:productId?'} component={Detail} />
                <Route component={PushProduct} path={'/addproduct'} />
                <Route path={"/cart"} component={Cart} />
            </Switch>
            </ConnectedRouter>
        );
    }
}

export default Routes;
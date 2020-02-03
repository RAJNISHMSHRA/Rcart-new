import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import '../node_modules/bootstrap/js/src/collapse';
import '../node_modules/bootstrap/js/dist/dropdown';
import store from './store/store'

import './style/style.scss'

import App from './components/App';
ReactDOM.render(
<Provider store={store}>
<App/>
</Provider>
, document.getElementById('root'));



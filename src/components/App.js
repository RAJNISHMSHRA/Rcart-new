import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {connect} from 'react-redux';
import Routes from './Routes';
import store from '../store/store';
import {fetchCartItems} from '../store/action';
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'


import Navbar from './navbar';
import {Provider} from 'react-redux';
class App extends Component {
  constructor (props) {
    super (props);
    this.state = {};
  }

  componentDidMount(){
    this.props.setProduct()
  }
  render () {
    
    return (
      <Router basename={'/'}>
        <Provider store={store}>
          <Navbar cartItems={this.props.cartItem}/>
          <ReactNotification />
          <Routes />
        </Provider>
        
      </Router>
    );
  }
}

const mapStatetoProps = (state) => {
  debugger
  console.log(state.reducer)
  return {
    cartItem:state.reducer.cartItems
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setProduct: data => {
      dispatch (fetchCartItems());
    },
   };
};

export default connect (mapStatetoProps, mapDispatchToProps) (App);

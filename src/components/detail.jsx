import React, { Component } from 'react';

import Details from './details'
import {getData} from '../service'


class Detail extends Component {
    constructor (props) {
        super (props);
        this.state = {
          clickedProduct: [],
        };
      }

    componentDidMount(){
        const linkProduct_Id= this.props.match.params.productId
        var that = this;
    const pageNav = 'products';
    const getClickedProduct = response => {
      that.setState({
        clickedProduct: response,
      });
    };
   
    let params={
        product_id:linkProduct_Id
    }
    getData(pageNav, params, getClickedProduct);
    }
    
    state = {  }
    render() {
        return (
            <React.Fragment>
                <Details product={this.state.clickedProduct} />
            </React.Fragment>
        );
    }
}

export default Detail;
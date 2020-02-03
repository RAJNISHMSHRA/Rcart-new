import React, {Component} from 'react';
import Brand from '../Brands/brand';
import Products from './products';
import Pagination from '../pagination';
import spinner from '../../images/spinner1.gif';
import Dropdown from '../dropdown';
import Search from '../search';
import {skeleton} from '../HomeSkeleton'
class Product extends Component {
  constructor (props) {
    super (props);
  }
  render () {
    const {data,searchPrducts,setChecked,setCartProducts,getPage_No} = this.props;
    const {brands, products, isLoading} = data;

    return (
      <React.Fragment>
        {isLoading
          ? <div className="container-fluid top-display main">
              <div className="search-outer d-flex justify-content-between">
                <Dropdown />
                <Search getSearchPro={searchPrducts} />
              </div>
              <hr />

              <Brand brand={brands} setChecked={setChecked} />
              <div className="right-content">
                <Products data={products} setCartProducts={setCartProducts}  />
                <Pagination getPage_No={getPage_No}  />
              </div>
            </div>
          :  <div className="Loader d-flex align-items-center justify-content-center">
              {/* {' '}
              <img
                src={spinner}
                width="70px"
                style={{margin: '6rem auto'}}
                alt="spinner loader"
              /> */}
              {skeleton}
            </div>}
      </React.Fragment>
    );
  }
}

export default Product;

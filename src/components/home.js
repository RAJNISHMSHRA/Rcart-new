import React, {Component} from 'react';
import Product from './Products/product';
import {connect} from 'react-redux';
import {getData} from '../service';
import {setCartItems} from '../store/action';
import reducer from '../store/reducer';
// import Pagination from './pagination';


class home extends Component {
 
  constructor (props) {
    super (props);
    this.state = {
      pageNo: 1,
      pageSize: 6,
      products: [],
      brands: [],
      isLoading: false,
      searchValue:'',
      CBrand_id:[]
    };
  }
  pagination=(pageno) =>{
    pageno && this.setState({ pageNo:pageno },()=> this.fetchProducts())
  }

  setCheckedBrands = (brand_id,checked) => {
    if (checked) {
      let Brand_id = [...this.state.CBrand_id];
      Brand_id.push (brand_id);
      this.setState ({
        CBrand_id: Brand_id,
      },()=>{
        this.fetchProducts()
      })
    }else {
      const unchekd = this.state.CBrand_id.filter (ids => {
        return ids !== brand_id;
      });
      this.setState ({
        CBrand_id: unchekd,
      },()=>{
        this.fetchProducts()
      });
    }
  }
  onProductSearch = value => {
    console.log (value);
    this.setState({
      searchValue:value,
      pageNumber:1
    },()=>{
      this.fetchProducts()
    })
  };
 setcartProduct= (item) =>{
  this.props.setCart(item,"p")
  }
  onClickedProduct = productID => {
    console.log (productID);
    
  };

 componentDidMount () {
    this.fetchProducts ();
    this.fetchBrands ();
    
  }
  fetchProducts = () => {
    const {pageNo, pageSize,searchValue,CBrand_id} = this.state;
    const that = this;
    const changeStateProduct = response => {

      that.setState (
        {
          ...that.state,
          products: response,
        },
        () => {
          console.log (this.state);
          localStorage.setItem (
            'products',
            JSON.stringify (this.state.products)
          );
        }
      );
    };
    const params = {
      page: pageNo,
      pageSize: pageSize,
      search:searchValue,
      brands:CBrand_id.toString()
    };
    getData ('products', params, changeStateProduct);
  };
  fetchBrands = () => {
    const {pageNo, pageSize} = this.state;
    const that = this;
    const changestateBrands = response => {
      that.setState (
        {
          ...that.state,
          brands: response,
          isLoading: true,
        },
        () => {
          console.log (this.state);
          localStorage.setItem ('brands ', JSON.stringify (this.state.brands));
        }
      );
    };

    const params = {
      page: pageNo,
      pageSize: pageSize,
      isLoading: true,
      
    };
    getData ('brands', params, changestateBrands);
  };

  render () {
    return (
      <div className="App">
        <Product data={this.state}
         setChecked={this.setCheckedBrands} 
         searchPrducts={this.onProductSearch}
          cartItems={this.props.cartItems} 
          setCartProducts={this.setcartProduct} 
            getPage_No= {this.pagination}
          />
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    cartItem:state.cartItems
  };
};
const mapDispatchToProps = dispatch => {
  return {
   
   setCart:(item,type)=>dispatch(setCartItems(item,type))
  };
};

export default connect (mapStatetoProps, mapDispatchToProps) (home);

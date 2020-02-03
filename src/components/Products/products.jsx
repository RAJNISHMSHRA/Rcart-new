import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import star from '../../images/star.svg';
import buy from '../../images/button-buy-bag.svg';
import {setCartItems} from '../../store/action';
import {connect} from 'react-redux';

class Products extends Component {
  constructor (props) {
    super (props);
  }

  setcartProd = item => {
    this.props.setCartProducts (item);
  };
  removeItem = (item, e) => {
    this.props.handleCartItemsCount (item, 'r');
  };
  isthereItem = (item, e) => {
    debugger;
    const addedItems = JSON.parse (localStorage.getItem ('productList'));

    return addedItems.find (prod => {
      return prod.product_id === item.product_id;
    });
  };

  render () {
    const productItems = this.props.data.map (product => {
      return (
        <div key={product.product_id} className="product-outer col-md-4 col-6">
          {/* <div className="cart-image d-flex align-items-center justify-content-center">
              <img src={`data:image/jpeg;base64,${product.picture}`} alt="img" />
            </div> */}
          <div className=" cart-item-outer">
            <div className="cart-item d-flex flex-column">
              <div className="cart-image d-flex align-items-center justify-content-center product-image">
                <Link to={`/details/${product.product_id}`}>
                  <img
                    src={`data:image/jpeg;base64,${product.picture}`}
                    alt="img"
                    //   onClick={showclickedProduct}
                    id={`${product.product_id}`}
                  />
                </Link>
              </div>
              <div className="star">
                <div className="star-img">
                  <span>4.5 <img src={star} alt="" className="" /></span>
                </div>
                <div className="cost">
                  <span>
                    {' '}<i className="fas fa-rupee-sign" /> {product.price}
                  </span>
                  <div className="d" />
                </div>

              </div>
              <div className="item-info text-center">
                <p className="text-bold">{product.title}</p>
                {/* <p style={{overflow:"hidden"}}>{product.description}</p> */}
              </div>
              <div className="cart-buttons d-flex flex-row">

                <button
                  className="btn d-flex align-items-center justify-content-center shadow-none jello-horizontal"
                  type="button"
                >

                  {this.isthereItem (product)
                    ? <span
                        style={{width: '100%'}}
                        onClick={this.removeItem.bind (this, product)}
                      >
                        <i class="fas fa-trash" /> REMOVE ITEM
                      </span>
                    : <span style={{width: '100%'}}>
                        <i class="fas fa-shopping-cart mr-3" /> Wishlist
                      </span>}

                </button>

                <button
                  className="btn d-flex align-items-center justify-content-center shadow-none add-cart jello-horizontal"
                  type="button"
                  onClick={this.setcartProd.bind (this, product)}
                  data-product={JSON.stringify (product)}
                >
                  {this.isthereItem (product)
                    ? <span>
                        <i class="fas fa-shopping-cart mr-3" /> IN CART
                      </span>
                    : <span> <img src={buy} alt="" />ADD TO CART</span>}

                </button>

              </div>
            </div>

          </div>
        </div>
      );
    });
    return (
      <React.Fragment>
        <div className="container-fluid product-container">
          <div className="row right-content-items">

            {productItems}

          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleCartItemsCount: (item, type) => dispatch (setCartItems (item, type)),
  };
};
export default connect ('', mapDispatchToProps) (Products);

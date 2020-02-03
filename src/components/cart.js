import React, {Component} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StripeCheckout from 'react-stripe-checkout';
import {fetchCartItems} from '../store/action';
import {setCartItems} from '../store/action';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Cart = props => {
  debugger;
  const notify = item =>
    toast (`${item.title} has been removed`, {
      type: toast.TYPE.INFO,
      position: 'bottom-right',
      // autoClose:1500,
    });

  console.log (props.match.params, 'cart');
  const handleToken = (token, addresses) => {
    console.log (token, addresses);
  };

  const inPCount = item => {
    props.handleCartItemsCount (item, 'p');
  };
  const inDCount = item => {
    props.handleCartItemsCount (item, 'd');
  };
  const removeItem = item => {
    props.handleCartItemsCount (item, 'r');
    notify (item);
  };

  const data = props.getcartProducts;

  let displaybuyproduct = data != null
    ? data.map (item => {
        return (
          <tr key={item.product_id} className="cart-tr">

            <td>
              {' '}
              <img
                className="cart-img"
                src={`data:image/jpeg;base64,${item.picture}`}
                alt="img"
              />
            </td>
            <td>{item.title}</td>
            <td>{item.stock}</td>
            <td>
              <div className="input-group quanitit-outer">
                <span className="input-group-btn">
                  <button
                    type="button"
                    className="btn btn-default shadow-none shake-bottom"
                    data-type="minus"
                    data-field="quant[1]"
                    onClick={inDCount.bind (this, item)}
                  >
                    <i className="fa fa-minus" aria-hidden="true" />
                  </button>
                </span>
                <input
                  type="text"
                  name="quant[1]"
                  className="form-control input-number quantity shadow-none"
                  value={item.quantity}
                  min="1"
                  max="10"
                  disabled
                />

                <span className="input-group-btn">
                  <button
                    type="button"
                    className="btn btn-default btn-number shadow-none shake-bottom"
                    data-type="plus"
                    data-field="quant[1]"
                    onClick={inPCount.bind (this, item)}
                  >
                    <i className="fas fa-plus" />
                  </button>
                </span>
              </div>
            </td>
            <td>
              <i className="fas fa-rupee-sign" />
              {' '}
              {`${item.price * item.quantity} `}
            </td>
            <td>
              <button
                onClick={removeItem.bind (this, item)}
                className="remove-item"
              >
                <i className="fas fa-trash" />

              </button>
            </td>
          </tr>
        );
      })
    : <h3>Curretly there is no items in the cart</h3>;

  return (
    <React.Fragment>
      <ToastContainer />

      <table className="table table-borderless cart-table mt-5">

        <thead>
          <tr className="cart-thead">
            <th>Item</th>
            <th>Model</th>
            <th>Stock</th>
            <th>Action</th>
            <th>Price</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {displaybuyproduct}
          <tr>
            <td />
            <td />
            <td />
            <td><span style={{float: 'right'}}>Total Price </span></td>
            <td style={{borderTop: '0.8px solid grey'}}>
              <i className="fas fa-rupee-sign" />
              {' '}
              <span>{Number (localStorage.getItem ('totalPrice'))}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{paddingRight: '30px', paddingBottom: '50px'}}>
        {/* <button
                type="button"
                className="btn btn-checkout btn-warning"
                style={{float: 'right'}}
              >
                Checkout
              </button> */}
        <div className="btn-cart">
          <Link to={'/'}>
            <button className="btn btn-continueShop my-3 shadow-none">
              Continue Shoping
            </button>
          </Link>
          <StripeCheckout
            token={handleToken}
            stripeKey="pk_test_hd5uTyhQcb1t8x5c8Kz4pXdT00YjQuBP1d"
            currency="INR"
            amount={Number (localStorage.getItem ('totalPrice')) * 100}
            label={<i class="fas fa-shopping-bag"> CHECKOUT</i>}
            className="btn btn-checkout btn-warning "
            style={{background: 'none'}}
          />
        </div>
      </div>

    </React.Fragment>
  );
};

const mapStatetoProps = state => {
  debugger;
  console.log (state.reducer);
  return {
    getcartProducts: state.reducer.cartItems,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setProduct: data => {
      dispatch (fetchCartItems ());
    },
    handleCartItemsCount: (item, type) => dispatch (setCartItems (item, type)),
  };
};
export default connect (mapStatetoProps, mapDispatchToProps) (Cart);

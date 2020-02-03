import React, {useEffect, useState} from 'react';
import spinner from '../images/loadingtext.gif';
import {setCartItems} from '../store/action';
import {connect} from 'react-redux';
import {store} from 'react-notifications-component';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link } from 'react-router-dom'
import ReactImageZoom from 'react-image-zoom';


const Details = props => {
  const notify = item =>
    toast (`${item} is already in cart`, {
      type: toast.TYPE.INFO,
      position: 'top-center',
      // autoClose:1500,
    });
  const {product, setItem} = props;
  const {picture, description, price, title, stock, product_id} = product;
  const [diplayState, setDisplayState] = useState ({
    isLoading: true,
    btnText: 'Add to cart',
  });
  const addCart = (item, e) => {
    debugger;
    const incartItem = JSON.parse (localStorage.getItem ('productList'));
    const addedItem = incartItem.filter (items => {
      return items.product_id == item.product_id;
    });
    if (addedItem.length != 0) {
      notify (item.title);
    } else {
      e.target.innerHTML = 'in cart';
    }

    props.setItem (product, 'p');
  };
  useEffect (
    () => {
      debugger;
      if (props.product.picture !== undefined) {
        const incartItem = JSON.parse (localStorage.getItem ('productList'));
        const addedItem = incartItem.filter (items => {
          return items.product_id == product_id;
        });
        if (addedItem.length != 0) {
          setDisplayState ({
            ...diplayState,
            isLoading: false,
            btnText: 'In cart',
          });
        } else {
          setDisplayState ({
            ...diplayState,
            isLoading: false,
          });
        }
      }
    },
    [picture]
  );

  return diplayState.isLoading == true
    ? <div style={{height: '100vh'}}>
        <img
          src={spinner}
          width="90px"
          style={{marginTop: '6rem'}}
          alt="spinner loader"
        />
      </div>
    : <React.Fragment>

        <div className="detail_outer">
          <ToastContainer />
          <div className="product_detailContainer_left">
  
              {/* <ReactImageZoom width="150" offset={{"vertical":0,"horizontal":-100}} zoomPosition="left" img= {`data:image/jpeg;base64,${picture}`} /> */}
                <img src={`data:image/jpeg;base64,${picture}`} width="200px" />
          </div>
          <div className="product_detailContainer_right ">
            <h2 className="detail-title">{title}</h2>
            <div className="detail_description">
              <p className="wishlist_description">{description}</p>
            </div>
            <div className="">
              <h4><i class="fas fa-rupee-sign" />{price}</h4>
              <span><p>Hurry Up ,{stock} items Left</p></span>
            </div>
            <div className="wishlist_btn_outer d-flex  justify-content-around mt-3 ">
              <button
                type="btn"
                className="btn btn-primary addCart justify-content-between"
                onClick={addCart.bind (this, product)}
              >
                {diplayState.btnText}
              </button>
                <Link to={'/cart'}>
              <button type="btn" className="btn btn-warning wishlist">
                Buy Now
              </button>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>;
};
const mapStatetoProps = state => {
  return {
    cartItem: state.cartItems,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setItem: (item, type) => dispatch (setCartItems (item, type)),
  };
};

export default connect (mapStatetoProps, mapDispatchToProps) (Details);

import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/nav-icon-bag.svg';
import {Button, Popover, PopoverHeader, PopoverBody} from 'reactstrap';

// import StripeCheckout from 'react-stripe-checkout';

const Navbar = props => {
  const [popoverOpen, setPopoverOpen] = useState (false);
  const toggle = () => setPopoverOpen (!popoverOpen);

  let bagItems = JSON.parse (localStorage.getItem ('productList'));

  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-md bg-dark navbar-dark bgcolor">

        <Link
          to="/"
          className="navbar-brand logo d-flex align-items-center"
          href="#"
        >
          <img src={logo} alt="bag" />R Cart
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/addproduct" className="nav-link">
                Add Product
              </Link>
            </li>
            <li className="nav-item">

              <Link to="/brands" className="nav-link">
                Brands
              </Link>
            </li>
            <Link to={`/cart/${props.cartItems}`}>

              <button type="btn" className="btn nav-cart" id="Popover1">
                <i className="fas fa-shopping-cart" />
                <span className="badge car_Count badge-secondary">
                  {props.cartItems.length}
                </span>
                <span style={{marginLeft: '6px'}}>cart</span>
                <br />
                <div className="caption" />
                <div className="onhover-cart">
                  <div className="card cart-popover">
                    <h5 className="card-title">In your Bag</h5>

                    <div className="card-body">
                      <p>

                       { bagItems?`You have ${bagItems.length} product
                        in yourcart`:`You have 0 item in your bag`}
                      </p>

                      <div
                        className="d-flex justify-content-around"
                        style={{overflow: 'auto'}}
                      >
                        {bagItems.map (item => {
                          return (
                            <img
                              src={`data:image/jpeg;base64,${item.picture}`}
                              alt="img"
                              width="20px"
                              id={`${item.product_id}`}
                            />
                          );
                        })}
                      </div>
                      <Link to={'/cart'}>
                        <a href="#" className="btn btn-primary">Buy Now</a>
                      </Link>
                    </div>
                  </div>

                </div>

              </button>

              {/* <Popover
                placement="bottom"
                isOpen={popoverOpen}
                target="Popover1"
                toggle={toggle}
              >
                <PopoverHeader>Popover Title</PopoverHeader>
                <PopoverBody>
                  Sed posuere consectetur est at lobortis. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.
                </PopoverBody>
              </Popover> */}

            </Link>
          </ul>
        </div>

      </nav>
    </React.Fragment>
  );
};
export default Navbar;

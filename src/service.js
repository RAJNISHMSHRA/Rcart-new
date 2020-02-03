// import React, {Component} from 'react';
import axios from 'axios';
const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0aWNpcGFudF9pZCI6NSwiaWF0IjoxNTc3Nzc0MzIwfQ.--1gSkEBEkjJFyyO__Z1Rrrp6TukjlZF3QbF8hY-tfo'
const url= `https://merck-mitc-react-training-2019.herokuapp.com/APIs/`
export const getData = (
  
  pageNav,
  // page,
  // pageSize,
  // changeState,
  // productId,
  // CBrand_id = [],
  // search=''
  params,
  changeStateProduct
) => {

  const myUrl = new URL (
    url+''+pageNav
  );
  
  return axios
    .get (myUrl.href, {
      headers: {
        // 'Content-Type': 'application/json',
        // Authorization: 'Bearer ' + 'token' //the token is a variable which holds the token
        'x-secret-key': secretKey
      },
      params:params,
    })
    .then (response => {
     const responsedata = response.data.d
     Array.isArray(responsedata) || Object.entries(responsedata).length !== 0 && responsedata.constructor === Object ? changeStateProduct(response.data.d):changeStateProduct([])
     
    })
    .catch (error => {
      console.log (error);
    });
};
export const removeDuplicate = array => {
  let uniqueArray = [];

  for (var title of array) {
    if (uniqueArray.indexOf (title) === -1) {
      uniqueArray.push (title);
    }
  }
  return uniqueArray;
};
export const setCartItemCount = (pitem, type,setDisplayState) => {
  let ismatch = false;
  const {product_id} = pitem;
  let lcartItems = JSON.parse (localStorage.getItem ('cart'));

  if (!lcartItems) {
    lcartItems = [];
  }

  for (let i = 0; i < lcartItems.length; i++) {
    if (lcartItems[i].product_id == product_id) {
      if (type == 'p') {
        let maxCount = lcartItems[i].stock;
        if (maxCount != 0) {
          lcartItems[i].count = lcartItems[i].count + 1;
          lcartItems[i].stock -= 1;
        }
      } else if (type == 'd') {
        let minCount = lcartItems[i].count;
        if (minCount > 0) {
          lcartItems[i].count = lcartItems[i].count - 1;
          lcartItems[i].stock += 1;
        }
      }
      ismatch = true;
    }
  }
  if (!ismatch) {
    pitem.count = 1;
    lcartItems.push (pitem);
  }

  const existingItems = localStorage.length > 0
    ? lcartItems.filter (item => item.product_id == product_id)
    : 0;
  if (existingItems.length > 0) {
    this.setState (
      {
        ...this.state,

        CartItems: lcartItems,
      },
      () => {
        localStorage.setItem ('cart', JSON.stringify (lcartItems));
      }
    );
  } else {
    var addedItems = [];
    localStorage.length > 0
      ? (addedItems = lcartItems.concat (pitem))
      : (addedItems = addedItems.concat (pitem));

    this.setState (
      {
        ...this.state,
        CartItems: addedItems,
        cartItemsCount: this.state.cartItemsCount + 1,
        no_ofItems: this.state.no_ofItems + 1,
      },
      () => {
        localStorage.setItem ('cart', JSON.stringify (this.state.CartItems));
        localStorage.setItem ('cartitem', this.state.cartItemsCount);
        localStorage.setItem ('itemsCount', this.state.no_ofItems);
      }
    );
  }
};
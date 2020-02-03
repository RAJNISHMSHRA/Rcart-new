export const fetchCartItems = () => { 
    let cartItems = JSON.parse (localStorage.getItem ('productList'))||  [];
  

  return {
    type: 'GET_CARTITEMS',
    payload: cartItems,
  };
};

export const setCartItems = (item,type) =>{
    return {
        type:'SET_CARTITEMS',
        payload:item,
        t:type
    }
}

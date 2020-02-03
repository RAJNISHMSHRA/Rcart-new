const initialState = {
  cartItems: [],
 
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CARTITEMS': {
      console.log (action.payload, 'reducer');
      return {
        ...state,
        cartItems: action.payload,
      };
    }
    case 'SET_CARTITEMS': {
      let cItems = JsonCopy (state.cartItems);
   
      let isMatch = false;

      for (let i = 0; i < cItems.length; i++) {
        if (action.payload.product_id == cItems[i].product_id) {
          if (action.t == 'p' && cItems[i].stock > 0) {
            isMatch = true;
            cItems[i].quantity += 1;
            cItems[i].stock -= 1;
            break;
          } else if (action.t == 'd' && cItems[i].quantity > 0) {
            isMatch = true;
            cItems[i].quantity -= 1;
            cItems[i].stock += 1;
            break;
          }
          else if(action.t=="r"){
            cItems= cItems.filter(item =>{
              return item.product_id !== action.payload.product_id
            })
          }

          isMatch = true;
          break;
        }
      
       
      }
      if (!isMatch) {
        action.payload.quantity = 1;
        cItems.push (action.payload);
      }
     let  totalPrice= cItems.reduce ((total, item) => {
        debugger;
        return (total += item.price * item.quantity);
      }, 0)
      localStorage.setItem ('productList', JSON.stringify (cItems));
      localStorage.setItem ('totalPrice', Number (totalPrice));
      return {
        ...state,
        cartItems: cItems,
      };
    }
  }
  return state;
};

const JsonCopy = source => {
  return JSON.parse (JSON.stringify (source));
};

export default reducer;

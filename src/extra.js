 //cart inc dec

 if (action.payload[0].product_id == cItems[i].product_id) {
    if (action.payload[1] == 'p'  && action.payload[0].stock>0) {
      isMatch = true;
      cItems[i].quantity += 1;
      cItems[i].stock -= 1;

      break;
    } else if (action.payload[1] == 'd' && action.payload[0].quantity>0) {
      isMatch = true;
      cItems[i].quantity -= 1;
      cItems[i].stock += 1;
      break;
    }
    break
  }
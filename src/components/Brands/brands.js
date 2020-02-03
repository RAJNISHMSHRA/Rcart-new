import React, {Component} from 'react';

const Brands = (props) => {
  const {brands, getCheckedProduct} = props;
const clickHandle = e => {
  debugger
  const {brand_id}=e.target.dataset
  const {checked} = e.target
   props.handleCheck (e);
   props.getCheckedProduct(brand_id,checked)
  };

 
  let brandsCheckbox = '';
  brandsCheckbox = brands.map (title => {
    return (
      <div
        className="d-flex flex-row align-items-center mb-2"
        key={`${title.brand_id}`}
      >
        <input
          type="checkbox"
          checked={undefined}
          id={`${title.title}`}
          onClick={clickHandle}
          data-brand_id={`${title.brand_id}`}
        />
        <label
          htmlFor={`${title.title}`}
          style={{marginLeft: '10px', marginBottom: '0px'}}
        >
          {title.title}
        </label>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div className="brands">
        <span className="brand-title"> Brand </span>
        <ul className="price-ul">
          {brandsCheckbox}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Brands;

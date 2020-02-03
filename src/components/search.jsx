import React, {useState, useEffect} from 'react';
import Dropdown from './dropdown';

const Search = props => {
  const {getSearchPro}= props
//   const [searchItems, setsearchItems] = useState ({
//     searchValue: '',
//   });
//   const searchProduct = e => {
//     let {value} = e.target;
//     setsearchItems ({
//       ...searchItems,
//       searchValue: value,
//     });
//   };

//   useEffect (
//     () => {
//       console.log (searchItems.searchValue);
//       props.searchItem (searchItems.searchValue);
//     },
//     [searchItems.searchValue]
//   );
 const  onSearch = (e) =>{
  const {value}= e.target

  props.getSearchPro(value)
}

  return (
    <React.Fragment>
      <div className="input-group search-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            <i className="fas fa-search"  />
          </span>
        </div>
        <input
          type="text"
          className="form-control shadow-none item-search useFontAwesomeFamily shadow-drop-center"
          type="search"
        //   value={searchItems.searchValue}
          placeholder=" Search "
          onFocus={e => (e.target.placeholder = '')}
          onBlur={e => (e.target.placeholder = 'Search')}
          onChange={e => onSearch (e)}
          id="search-item"
        />
      </div>

    </React.Fragment>
  );
};
export default Search;

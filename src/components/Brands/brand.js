import React, {Component} from 'react';

import Brands from './brands';

class Brand extends Component {
    state = {
        samsung: false,
        Apple: false,
        google: false,
        blackberry: false,
        redmi: false,
      };
      handleChecked = e => {
          debugger
        const {id} = e.target;
        this.setState ({
          id:!id,
        });
      };
  render () {
    const {brand,setChecked} = this.props;
    return (
      <React.Fragment>
        <div className="left-bar">
          <div className="left-menu">
            <Brands brands={brand}  handleCheck={this.handleChecked} getCheckedProduct={this.props.setChecked}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Brand;

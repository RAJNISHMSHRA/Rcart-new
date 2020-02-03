import React, { Component } from 'react';


class Pagination extends Component {
    state = {  }
    render() {
        const pageClicked = e => {
            const {id} = e.target;
            console.log (id, 'pageno');
            debugger;
           this.props.getPage_No(id)
          };


        return (
            <React.Fragment>
            <div className="mt-5">
              <ul className="pagination " style={{margin: '1rem 50%'}}>
                {/* <li className="page-item"><a className="page-link" >Previous</a></li> */}
                <li className="page-item ">
                  <a className="page-link outline-none" id="1" onClick={pageClicked}>
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" id="2" onClick={pageClicked}>2</a>
                </li>
                <li className="page-item">
                  <a className="page-link" id="3" onClick={pageClicked}>3</a>
                </li>
                {/* <li className="page-item"><a className="page-link"   onClick ={pageClicked}>Next</a></li> */}
      
              </ul>
            </div>
      
          </React.Fragment>
        );
    }
}

export default Pagination;
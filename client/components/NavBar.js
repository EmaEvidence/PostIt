import React from 'react';

class NavBar extends React.Component {
  render() {
    return (
      <div className="header">
        <nav className="teal row valign-wrapper " >
          <div className="col s12 nav-wrapper ">
            <b className="left-align title"> Post IT </b>
            <span className="logger">
              <button className="btn btn-default" data-toggle="modal" data-target="#signup">
                Sign Up
              </button>&nbsp;&nbsp;&nbsp;&nbsp;
              <button className="btn btn-default" data-toggle="modal" data-target="#signin">
                  Sign In
              </button>
            </span>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;

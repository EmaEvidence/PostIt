import React from 'react';

class NavBar extends React.Component {
  render() {
    return (
      <header>
        <nav className="teal row valign-wrapper" >
          <div className="col s4"> <h1 className="center-align"> Post IT </h1> </div>
          <div className="col s8 nav-wrapper">
            <ul id="nav-mobile" className="right hide-on-med-and-down valign-wrapper">
              <li> <a href="" data-toggle="modal" data-target="#signup">
                Sign Up
              </a> </li>
              <li> <a href="" data-toggle="modal" data-target="#signin">
                  Sign In
              </a> </li>
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

export default NavBar;

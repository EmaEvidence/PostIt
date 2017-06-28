import React from 'react';
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  render() {
    return (
      <div className="header">
        <nav className="teal row valign-wrapper " >
          <div className="col s12 nav-wrapper ">
            <b className="left-align title"> Post IT </b>
            <span className="logger">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/createmessage">Send Message</Link></li>
                <li><Link to="/creategroup"> Create Group </Link></li>
                <li><Link to="/messageboard"> Message Board </Link></li>
                <li>
                  <button className="btn btn-default" data-toggle="modal" data-target="#signup">
                    Sign Up
                  </button>
                </li>
                <li>
                  <button className="btn btn-default" data-toggle="modal" data-target="#signin">
                      Sign In
                  </button>
                </li>
              </ul>
            </span>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;

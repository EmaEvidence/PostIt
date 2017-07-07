import React from 'react';
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  render() {
    return (
      <nav className="row nav">
        <div className="header valign-wrapper teal">
          <div className="col s12 nav-wrapper ">
            <b className="left-align title"> Post IT </b>
            <span className="logger">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/createmessage">Send Message</Link></li>
                <li><Link to="/creategroup"> Create Group </Link></li>
                <li><Link to="/messageboard"> Message Board </Link></li>
                <li>
                  <button
                    className="btn waves-effect waves-light"
                    data-toggle="modal"
                    data-target="#signup"
                  >
                      Sign Up
                  </button>
                  &nbsp;&nbsp;&nbsp;
                </li>
                <li>
                  <button
                    className="btn waves-effect waves-light"
                    data-toggle="modal"
                    data-target="#signin"
                  >
                        Sign In
                  </button>
                </li>
              </ul>
            </span>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;

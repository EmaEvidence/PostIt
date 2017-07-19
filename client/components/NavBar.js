import React from 'react';
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  render() {
    return (
      <header className="navbar-fixed postitheader">
        <nav className="postitnav">
          <a href="" className="brandname">Post IT</a>
          <ul id="nav-mobile" className="right hide-on-small-only">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/messageboard"> Messages </Link></li>
            <li>
              <a href="" data-toggle="modal" data-target="#creategroup"> Create a Group </a> </li>
            <li> <Link to="/createmessage">Send Message</Link> </li>
            <li> <a href=""> Log Out </a> </li>
            <li> <a href="" data-toggle="modal" data-target="#signup">
              Sign Up
            </a> </li>
            <li> <a href="" data-toggle="modal" data-target="#signin">
                Sign In
            </a> </li>
          </ul>
          <a className="dropdown-button right hide-on-med-and-up" href="" data-activates="menu">
              Menu
              <i className="material-icons right">arrow_drop_down</i>
          </a>
          <ul id="menu" className="dropdown-content">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/messageboard"> Messages </Link></li>
            <li>
              <a href="" data-toggle="modal" data-target="#creategroup"> Create a Group </a> </li>
            <li> <Link to="/createmessage">Send Message</Link> </li>
            <li><a href="#!">Log Out</a></li>
            <li> <a href="" data-toggle="modal" data-target="#signup">
              Sign Up
            </a> </li>
            <li> <a href="" data-toggle="modal" data-target="#signin">
                Sign In
            </a> </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default NavBar;

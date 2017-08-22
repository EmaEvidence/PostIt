import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class NavBar extends React.Component {
  constructor(props){
    super(props);

    this.logOut = this.logOut.bind(this);
  }

  logOut() {
    window.localStorage.removeItem('token');
    window.location.href = '/';
  }

  render() {
    const status = this.props.logged_in_status;
    const username = JSON.parse(this.props.user_details);
    let nav;
    if (status || username === '') {
      nav = (<header className="navbar-fixed postitheader">
        <nav className="postitnav">
          <a href="" className="brandname">Post IT</a>
          <b className="welcome">Welcome {username.username}, how are you doing?</b>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/messageboard"> Message Board </Link></li>
            <li><a className="" href="#notifications">
             Notification 2</a></li>
            <li>
              <a href="" data-toggle="modal" data-target="#creategroup"> Create a Group </a> </li>
            <li> <Link to="/createmessage">Send Message</Link> </li>
            <li> <a href="" onClick={this.logOut}> Log Out </a> </li>
          </ul>
          <a className="dropdown-button right hide-on-large-only" href="" data-activates="menu">
              Menu
              <i className="material-icons right">arrow_drop_down</i>
          </a>
          <ul id="menu" className="dropdown-content">
            <li><Link to="/">Home</Link></li>
            <li><a className="" href="#notifications">
             Notification 2</a></li>
            <li><Link to="/messageboard"> Messages </Link></li>
            <li>
              <a href="" data-toggle="modal" data-target="#creategroup"> Create a Group </a> </li>
            <li> <Link to="/createmessage">Send Message</Link> </li>
            <li><a href="#!" onClick={this.logOut}>Log Out</a></li>
          </ul>
        </nav>
      </header>);
    } else {
      nav = (
        <header className="navbar-fixed postitheader">
          <nav className="postitnav">
            <a href="" className="brandname">Post IT</a>
            <ul id="nav-mobile" className="right hide-on-small-only">
              <li> <a href="" data-toggle="modal" data-target="#signup">
                Sign Up
              </a> </li>
              <li> <a href="" data-toggle="modal" data-target="#signin">
                  Sign In
              </a> </li>
            </ul>
            <a
              className="dropdown-button right hide-on-med-and-up"
              href=""
              data-activates="menu-hidden"
            >
                Menu
                <i className="material-icons right">arrow_drop_down</i>
            </a>
            <ul id="menu-hidden" className="dropdown-content">
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
    return (
      nav
    );
  }
}

NavBar.propTypes = {
  logged_in_status: React.PropTypes.bool.isRequired,
  user_details: React.PropTypes.string.isRequired
};

function mapStateToProps(state) {
  let username;
  if (state.authUser.user_details.data === undefined) {
    username = '';
  } else {
    username = state.authUser.user_details.data.username;
  }
  return {
    logged_in_status: state.authUser.logged_in,
    user_details: JSON.stringify(state.authUser.user_details)
  };
}

export default connect(mapStateToProps)(NavBar);

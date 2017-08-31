import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import Notification from './Notification';
/**
 * [NavBar ]
 */
export class NavBar extends React.Component {
  /**
   * [constructor description]
   * @method constructor
   * @param  {object}    props [description]
   * @return {void}          []
   */
  constructor(props) {
    super(props);

    this.logOut = this.logOut.bind(this);
  }
  /**
   * [logOut description]
   * @method logOut
   * @return {void} []
   */
  logOut() {
    window.localStorage.removeItem('token');
    window.location.href = '/';
  }
  /**
   * [render displays the html ]
   * @method render
   * @return {ReactElement} [markup]
   */
  render() {
    const status = this.props.loggedInStatus;
    const username = JSON.parse(this.props.userDetails);
    let notifications = [];
    if (JSON.parse(this.props.userDetails).notifications !== undefined) {
      notifications = JSON.parse(this.props.userDetails).notifications;
    }
    let nav;
    if (status || username === '') {
      nav = (<header className="navbar-fixed postitheader">
        <nav className="postitnav">
          <a href="" className="brandname">Post IT</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/messageboard"> Message Board </Link></li>
            <li className="dropdown">
              <a className="dropdown-toggle" href="" data-toggle="dropdown">
             Notification
             <span className="new badge deep-purple lighten-3">{notifications.length}</span>
              </a>
            </li>
            <li>
              <a href="" data-toggle="modal" data-target="#creategroup"> Create a Group </a> </li>
            <li> <a href="" onClick={this.logOut}> Log Out </a> </li>
          </ul>
          <a className="dropdown-button right hide-on-large-only" href="" data-activates="menu">
              Menu
              <i className="material-icons right">arrow_drop_down</i>
          </a>
          <ul id="menu" className="dropdown-content">
            <li><Link to="/">Home</Link></li>
            <li className="dropdown">
              <a className="dropdown-toggle" href="" data-toggle="dropdown">
             Notification
             <span className="new badge deep-purple lighten-3">{notifications.length}</span>
              </a>
            </li>
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
  loggedInStatus: React.PropTypes.bool.isRequired,
  userDetails: React.PropTypes.string.isRequired
};

/**
 * [mapStateToProps makes the store data available]
 * @method mapStateToProps
 * @param  {object}        state [the store date]
 * @return {object}              [ the data needed by the component]
 */
const mapStateToProps = (state) => {
  return {
    loggedInStatus: state.authUser.loggedIn,
    userDetails: JSON.stringify(state.authUser.userDetails),
  };
};

export default connect(mapStateToProps)(NavBar);

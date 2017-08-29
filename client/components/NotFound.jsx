import React from 'react';

/**
 * [NotFound description]
 * @method      NotFound
 * @constructor
 */
function NotFound() {
  return (
    <div id="" className="reg-form row center page-not-found">
      <h1> 404 </h1>
      <h1> Page Not Found </h1>
      <h2> Return Home <a href="/"> click here </a> </h2>
    </div>
  );
}

NotFound.propTypes = {
  userSignin: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired
};

export default NotFound;

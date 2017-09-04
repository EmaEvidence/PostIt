import React from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import Main from './Main';

/**
 * Main App structure
 * @method      App
 * @constructor
 */
const App = () => (
  <div>
    <Navbar />
    <Main />
    <Footer />
  </div>
  );

export default App;

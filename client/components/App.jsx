import React from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import Main from './Main';

/**
 * Main App structure
 * @method App
 *
 * @return {ReactElement} markup
 */
const App = () => (
  <div>
    <Navbar />
    <Main />
    <Footer />
  </div>
  );

export default App;

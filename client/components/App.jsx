import React from 'react';
import Navbar from './NavBar';
import Footer from './Footer';
import Main from './Main';

/**
 * [Main App structure]
 * @method      App
 * @constructor
 */
export default function App() {
  return (
    <div>
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

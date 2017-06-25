import React from 'react';
import ReactDom from 'react-dom';
import Tagline from './components/Tagline';
import Index from './components/Index';

ReactDom.render(
  <Tagline />,
    document.getElementById('app')
  );

ReactDom.render(
  <Index />,
    document.getElementById('root')
);

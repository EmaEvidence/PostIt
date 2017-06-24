import React from 'react';
import ReactDom from 'react-dom';
import Tagline from './components/Tagline';
import Message from './components/Message';

ReactDom.render(
  <Tagline />,
    document.getElementById('app')
  );

ReactDom.render(
  <Message />,
    document.getElementById('root')
);

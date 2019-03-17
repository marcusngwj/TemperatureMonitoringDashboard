import React from 'react';
import Hello from './Hello.jsx';
import Info from './Info.jsx';
import FloorplanView from '../components/FloorplanView.jsx';

const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <Hello />
    <Info />
    <FloorplanView />
  </div>
);

export default App;

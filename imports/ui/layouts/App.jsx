import React from 'react';
import Hello from './Hello.jsx';
import Info from './Info.jsx';
import Floorplan from '../components/Floorplan.jsx';

const App = () => (
  <div>
    <h1>Welcome to Meteor!</h1>
    <Hello />
    <Info />
    <Floorplan />
  </div>
);

export default App;

import React, { Component } from 'react';
import '../styles/app.scss';
import Hello from './Hello.jsx';
import Info from './Info.jsx';
import FloorplanView from '../components/FloorplanView.jsx';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <h1 className="app-title">Temperature Monitoring Dashboard</h1>
        <FloorplanView />
        <Hello />
        <Info />
      </div>
    );
  }
}

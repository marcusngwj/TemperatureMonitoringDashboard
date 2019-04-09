import React, { Component } from 'react';
import '../styles/sliderview.scss';

export default class SliderView extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="sliderview-main">
          <input type="range" min="1" max="100" value="50" />
        </div>
      </div>
    );
  }
}
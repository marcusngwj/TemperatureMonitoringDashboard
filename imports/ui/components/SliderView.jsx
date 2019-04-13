import React, { Component } from 'react';
import '../styles/sliderview.scss';

export default class SliderView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 8000
    }
  }

  handleOnChange = (e) => {
    this.props.onChange(this.state.value);
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="sliderview-main">
          <input type="range" min="1" max="100" value={this.state.value} onChange={this.handleOnChange} />
          <span>{this.state.value}</span>
          <span>Samples</span>
        </div>
      </div>
    );
  }
}
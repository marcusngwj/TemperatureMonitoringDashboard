import React, { Component } from 'react';
import '../styles/datetimeview.scss';

export default class DateTimeView extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="datetimeview-main">
          <span>{this.props.label}</span>
          <input type="text" />
          <input type="text" />
        </div>
      </div>
    );
  }
}
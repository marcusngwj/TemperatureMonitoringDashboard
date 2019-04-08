import React, { Component } from 'react';
import '../styles/filterbuttonview.scss';

export default class FilterButtonView extends Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="filterbuttonview-main">
          <button>Filter</button>
        </div>
      </div>
    );
  }
}
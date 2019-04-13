import React, { Component } from 'react';
import '../styles/controlview.scss';

import DateTimeView from '../components/DateTimeView';
import SliderView from '../components/SliderView';
import FilterButtonView from '../components/FilterButtonView';

export default class ControlView extends Component {
  render() {
    return (
      <div className="controlview-main">
        <div className="datetime-container">
          <DateTimeView className="start-date-time-view" label="Start" onChange={this.props.onChangeStartDateTime} />
          <DateTimeView className="end-date-time-view" label="End" onChange={this.props.onChangeEndDateTime} />
        </div>
        <SliderView className="sliderview" onChange={this.props.onChangeMaxSamples}/>
      </div>
    );
  }
}

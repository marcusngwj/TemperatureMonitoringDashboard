import React, { Component } from 'react';
import '../styles/controlview.scss';

import DateTimeView from '../components/DateTimeView';
import SliderView from '../components/SliderView';
import FilterButtonView from '../components/FilterButtonView';

export default class ControlView extends Component {
  render() {
    return (
      <div className="controlview-main">
        <DateTimeView className="start-date-time-view" label="Start"/>
        <DateTimeView className="end-date-time-view" label="End"/>
        <SliderView className="sliderview" />
        <FilterButtonView className="filterbuttonview" />
      </div>
    );
  }
}

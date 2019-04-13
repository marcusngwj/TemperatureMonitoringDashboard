import React, { Component } from 'react';
import '../styles/controlview.scss';

import DateTimeView from '../components/DateTimeView';
import SliderView from '../components/SliderView';

export default class ControlView extends Component {
  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  updateStartDateTime = (dateTime) => {
    this.startDateTimeView.updateMoment(dateTime);
  }

  updateEndDateTime = (dateTime) => {
    this.endDateTimeView.updateMoment(dateTime);
  }

  render() {
    return (
      <div className="controlview-main">
        <div className="datetime-container">
          <DateTimeView onRef={ref => (this.startDateTimeView = ref)}
                        className="start-date-time-view" 
                        label="Start" 
                        onChange={this.props.onChangeStartDateTime} 
          />
          <DateTimeView onRef={ref => (this.endDateTimeView = ref)}
                        className="end-date-time-view" 
                        label="End" 
                        onChange={this.props.onChangeEndDateTime} 
          />
        </div>
        <SliderView className="sliderview" onChange={this.props.onChangeMaxSamples}/>
      </div>
    );
  }
}

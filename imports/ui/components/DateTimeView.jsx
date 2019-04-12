import React, { Component } from 'react';
import moment from 'moment';
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import '../styles/datetimeview.scss';
import 'rc-datetime-picker/dist/picker.css';

/**
 * https://allenwooooo.github.io/rc-datetime-picker/
 */
export default class DateTimeView extends Component {
  constructor() {
    super();
    this.state = {
      moment: moment()
    };
  }

  handleChange = (moment) => {
    this.setState({
      moment
    });
    console.log(moment);
  }

  render() {
    return (
      <div className={this.props.className}>
        <DatetimePickerTrigger className="datetimeview-main"
          moment={this.state.moment}
          onChange={this.handleChange}>
          <div className="datetimeview-background">
            <span>{this.props.label}</span>
            <input value={this.state.moment.format('YYYY-MM-DD HH:mm')} className="datetimeview-textvalue-area" type="text" readOnly />
          </div>
        </DatetimePickerTrigger>
      </div>
    );
  }
}
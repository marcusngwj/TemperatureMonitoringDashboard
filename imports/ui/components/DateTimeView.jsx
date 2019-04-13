import React, { Component } from 'react';
import moment from 'moment';
import { DatetimePickerTrigger } from 'rc-datetime-picker';
import '../styles/datetimeview.scss';
import 'rc-datetime-picker/dist/picker.css';

/**
 * DatetimePicker Reference: https://allenwooooo.github.io/rc-datetime-picker/
 * DatetimePicker API: https://github.com/AllenWooooo/rc-datetime-picker
 */
export default class DateTimeView extends Component {
  constructor() {
    super();
    this.state = {
      moment: moment('2013-10-01 00:00')
    };
  }

  handleChange = (moment) => {
    this.setState({
      moment
    });

    this.props.onChange(moment);
  }

  render() {
    return (
      <div className={this.props.className}>
        <DatetimePickerTrigger className="datetimeview-main"
                               onChange={this.handleChange}
                               moment={this.state.moment}
                               minDate={moment('2013-10-01 00:00')}
                               maxDate={moment('2013-12-31 23:49')}
        >
          <div className="datetimeview-background">
            <span>{this.props.label}</span>
            <input value={this.state.moment.format('YYYY-MM-DD   LT')} className="datetimeview-textvalue-area" type="text" readOnly />
          </div>
        </DatetimePickerTrigger>
      </div>
    );
  }
}
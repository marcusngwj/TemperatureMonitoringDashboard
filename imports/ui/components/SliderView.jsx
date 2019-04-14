import React, { Component } from 'react';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import '../styles/sliderview.scss';
import 'rc-slider/assets/index.css';

// Source: https://github.com/react-component/slider
const SliderWithTooltip = createSliderWithTooltip(Slider);

export default class SliderView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 300
    }
  }

  handleChange = (newValue, e) => {
    this.setState({
      value: newValue
    });
    this.props.onChange(newValue);
  }

  render() {
    return (
      <div className={this.props.className}>
        <SliderWithTooltip className="sliderview-main"
                           min={10}
                           max={6000}
                           value={this.state.value}
                           onChange={this.handleChange}
        />
        <span>{this.state.value}</span>
        <span>Samples</span>
      </div>
    );
  }
}
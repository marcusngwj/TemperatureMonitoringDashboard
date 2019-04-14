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
      value: 1000
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
      <div className={"sliderview-main " + this.props.className}>
        <div className="slider-container">
          <SliderWithTooltip 
                            min={10}
                            max={6000}
                            value={this.state.value}
                            onChange={this.handleChange}
          />
        </div>
        <span className="sliderview-text">{this.state.value} Samples</span>
      </div>
    );
  }
}
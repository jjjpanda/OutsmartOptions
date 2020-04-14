import React from 'react';
import {
  InputNumber,
  Icon,
} from 'antd';

class CalculateMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <InputNumber
          style={{ width: '175px', marginBottom: '3vh' }}
          placeholder="Percent Interval"
          onPressEnter={this.props.calculateProfits}
          onChange={this.props.intervalChange}
          suffix={(
            <Icon type="percentage" />
                    )}
        />
        <br />
        <InputNumber
          style={{ width: '175px', marginBottom: '1vh' }}
          placeholder="Number of Intervals"
          onPressEnter={this.props.calculateProfits}
          onChange={this.props.numberChange}
          suffix={(
            <Icon type="number" />
                    )}
        />
      </div>
    );
  }
}

export default CalculateMenu;

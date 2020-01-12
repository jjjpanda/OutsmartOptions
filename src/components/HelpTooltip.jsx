import React from 'react';
import {
  Popover,
  Icon,
} from 'antd';

class HelpTooltip extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.hide) {
      return (
        <Popover content={this.props.content} title={this.props.title} trigger="hover">
          <Icon type="info-circle-o" />
        </Popover>
      );
    }
  }
}

export default HelpTooltip;

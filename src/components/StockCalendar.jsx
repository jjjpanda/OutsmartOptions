import React from 'react';
import {
  Calendar,
  Badge,
  Icon,
} from 'antd';

import * as moment from 'moment';

class StockCalendar extends React.Component {
  constructor(props) {
    super(props);
  }

    dateCellRender = (value) => {
      if (moment(this.props.earningsDate).diff(value, 'days') < 1) {
        return (
          <h1>{value.date()}</h1>
        );
      }

      return (
        <strong>{value.date()}</strong>
      );
    }

    onDateChange = (value, m) => {
      console.log(value);
    }

    render() {
      return (
        <Calendar fullscreen={false} onSelect={this.onDateChange} dateFullCellRender={this.dateCellRender} />
      );
    }
}

export default StockCalendar;

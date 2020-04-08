import React from 'react';
import {
  Calendar,
  Badge,
  Icon,
  Button,
  Modal
} from 'antd';

import * as moment from 'moment';

class StockCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      erVisible: false
    }
  }

  dateCellRender = (value) => {
    if (moment(this.props.earningsDate).diff(value, 'hours') < 24) {
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

  showCalendar = () => {
    this.setState(() => ({erVisible: true}))
  }

  closeCalendar = () => {
    this.setState(() => ({erVisible: false}))
  }

  render() {
    return (
      <div>
        <Button icon="calendar" onClick={this.showCalendar} />
        <Modal
            visible={this.state.erVisible}
            footer = {<Button onClick={this.closeCalendar} >Ok</Button>}
        >
          <Calendar fullscreen={false} onSelect={this.onDateChange} dateFullCellRender={this.dateCellRender} />
        </Modal>
      </div>
    );
  }
}

export default StockCalendar;

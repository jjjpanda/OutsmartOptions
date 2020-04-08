import React from 'react';
import {
  Calendar,
  Badge,
  Icon,
  Button,
  Modal,
  Popover
} from 'antd';

import IVDate from './IVDate.jsx'

class StockCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      erVisible: false
    }
  }

  dateCellRender = (value) => {
    return (
      <IVDate key={value} date={value} earningsDate={this.props.earningsDate} />
    )
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
          <Calendar fullscreen={true} onSelect={this.onDateChange} dateFullCellRender={this.dateCellRender} />
        </Modal>
      </div>
    );
  }
}

export default StockCalendar;

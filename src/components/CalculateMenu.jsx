import React from 'react'
import {
    InputNumber,
    Button,
    Modal,
    Icon,
    Menu,
} from 'antd';

import StockCalendar from './StockCalendar.jsx'

class CalculateMenu extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        return (
            <Menu>
                <Menu.Item key="1">
                <InputNumber
                    placeholder="Percent Interval"
                    onPressEnter={this.props.calculateProfits}
                    onChange={this.props.intervalChange}
                    suffix={(
                        <Icon type="percentage" />
                    )}
                />
                </Menu.Item>
                <Menu.Item key="2">
                    <InputNumber
                        placeholder="Number of Intervals"
                        onPressEnter={this.props.calculateProfits}
                        onChange={this.props.numberChange}
                        suffix={(
                            <Icon type="number" />
                        )}
                    />
                </Menu.Item>
                <Menu.Item key="3">
                    <Button onClick={this.props.showCalenderOnClick}>
                        Show Calender
                    </Button>
                    <Modal
                        visible={this.props.erVisible}
                        footer = {<Button onClick={this.props.calendarModalOk} >Ok</Button>}
                    >
                        <StockCalendar earningsDate={this.props.earningsDate} fullscreen={false} />
                    </Modal>
                </Menu.Item>
            </Menu>
        )
    }
}

export default CalculateMenu;
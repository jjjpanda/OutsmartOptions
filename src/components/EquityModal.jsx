import React from 'react';
import {
  Input,
  InputNumber,
  Button,
  Switch,
  Modal,
  Table,
  Collapse,
  Checkbox,
  Icon,
  Menu,
  Popover,
  Calendar,
  Spin,
  Typography,
} from 'antd';

import * as moment from 'moment';

class EquityModal extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            equityModalVisible: false,
            isLong: true,
            shares: 0
        }
    }

    openEquityModal = () => {
        this.setState(() => ({equityModalVisible: true}))
    }

    closeEquityModal = () => {
        this.props.onHandleOptionLegChange(true, true, this.state.isLong, 0, this.props.price, this.props.price, moment().add(5, 'years'), 0, `${this.state.isLong?"long":"short"}${this.state.shares}`)
        this.setState(() => ({equityModalVisible: false}))
    }

    render() {
        return ( 
            <div>
                <Button icon="fund" disabled={this.props.symbol === ""} onClick={this.openEquityModal}>Equity</Button>
                <Modal
                    title="Add Equity"
                    centered
                    width="50%"
                    visible={this.state.equityModalVisible}
                    footer={(
                        <Button key="ok" step-name="ok-button-modal" type="primary" onClick={this.closeEquityModal}>
                            Ok
                        </Button>
                    )}
                    onCancel={this.closeEquityModal}
                >
                    <Switch 
                        checked = {this.state.isLong} 
                        onChange={(e) => {this.setState({isLong: e})}} 
                        checkedChildren={<Typography>Long</Typography>}
                        unCheckedChildren={<Typography>Short</Typography>}
                    />
                    <InputNumber 
                        placeholder="Shares" 
                        onChange={(e) => {this.setState({shares: parseFloat(e)})}}
                    /> 
                </Modal>
            </div>
        )
    }
}

export default EquityModal
import React from 'react'

import {
    Calendar,
    Badge,
    Icon,
    Button,
    Modal,
    Popover
} from 'antd';

import * as moment from 'moment';

class IVDate extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            visible: false
        }
        //console.log(moment(this.props.earningsDate).isSame(this.props.date, 'day'))
    }

    onVisibleChange = visible => {
        this.setState({ visible });
    }

    render() {
        return (  
            <Popover
                content={<div>Bruh</div>}
                title={'Bruh Title'}
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.onVisibleChange}
            >
                <Button type="link">{this.props.date.date()}</Button>
            </Popover>
        )
    }
}

export default IVDate
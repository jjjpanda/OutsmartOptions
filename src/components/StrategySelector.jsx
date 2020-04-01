import React from 'react';
import {
  Typography,
  Button,
  List,
  Modal,
  Tabs
} from 'antd';

const TabPane = Tabs.TabPane;

import Cookie from 'js-cookie';
import verifyUser from './UserVerifier.jsx';

import {
    utilique as util,
} from 'que-series';

const { request, structure } = util;

class StrategySelector extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            modalVisible: false,
            loading: false,
            loggedIn: false,
            strategies: []
        }
        verifyUser(({ loggedIn, user, email }) => {
            this.setState(() => ({ loggedIn }));
        });
    }

    loadStrategy = () => {
        this.setState(() => ({loading: true}))
        //
        request.postFetchReqAuth('/api/strategy/load', Cookie.get('token'), JSON.stringify({ticker: this.props.symbol != undefined ? this.props.symbol: "", id: Cookie.get('id')}), (data) => {
            this.setState(() => ({  
                modalVisible: true, 
                loading: false, 
                strategies: structure.strategiesExtraction(data.strategies) 
            }), ()=> {console.log(this.state.strategies)})
        })
        
    }

    saveStrategy = () => {
        console.log("saving", this.props.symbol, this.props.optionsSelected)
        if (this.props.symbol != '' && this.props.optionsSelected.length > 0 && this.state.loggedIn) {
            request.postFetchReqAuth('/api/strategy/save', Cookie.get('token'), JSON.stringify({ id: Cookie.get('id'), ticker: this.props.symbol, legs: this.props.optionsSelected }), (data) => {
                console.log(data);
            });
        } else {
            // Not Logged in, reroute the uesr to login
        }
    }

    handleOk = () => {

    }

    handleCancel = () => {
        this.setState(() => ({modalVisible: false}))
    }

    renderCards = (stockStrats) => {
        return stockStrats.map((strat, index) => (
            <List
                header={<div>{`Strategy ${index+1}`}</div>}
                bordered
                dataSource={strat}
                renderItem={item => (
                    <List.Item>
                        <Typography.Text>{JSON.stringify(item, undefined, 4)}</Typography.Text>
                    </List.Item>
                )}
            />
        ))
    }

    renderTabs = () => {
        return Object.keys(this.state.strategies).map(i => (
            <TabPane tab={i} key={i}>
                {this.renderCards(this.state.strategies[i])}
            </TabPane>
        ))
    }

    render(){
        return (
            <div>
                <div id="saveButton"><Button shape="circle" icon="save" onClick={this.saveStrategy} /></div>
                <div id="savedStrategyButton"><Button shape="circle" icon="download"  loading= {this.state.loading} disabled= {!this.state.loggedIn} onClick={this.loadStrategy} /></div>
                <Modal
                    title="Basic Modal"
                    visible={this.state.modalVisible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <Tabs tabPosition={'left'}>
                        {this.renderTabs()}
                    </Tabs>
                </Modal>
            </div>
        );
    }
}

export default StrategySelector
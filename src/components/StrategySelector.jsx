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
import * as moment from 'moment';

import {
    mathematique as math,
    utilique as util,
} from 'que-series';

const { request, structure } = util;
const { options } = math

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
        this.setState(() => ({loading: true, modalVisible: false}))
        //
        request.postFetchReqAuth('/api/strategy/load', Cookie.get('token'), JSON.stringify({ticker: this.props.symbol != undefined ? this.props.symbol: "", id: Cookie.get('id')}), (data) => {
            console.log(data)
            this.setState(() => ({  
                modalVisible: true, 
                loading: false, 
                strategies: structure.strategiesClumpByStock(data.strategies) 
            }), ()=> {console.log(this.state.strategies)})
        })
        
    }

    saveStrategy = () => {
        console.log("saving", this.props.symbol, this.props.optionsSelected, options.nameStrategy(options.extractStrategies(this.props.optionsSelected)))
        if (this.props.symbol != '' && this.props.optionsSelected.length > 0 && this.state.loggedIn) {
            request.postFetchReqAuth('/api/strategy/save', Cookie.get('token'), JSON.stringify({ id: Cookie.get('id'), ticker: this.props.symbol, name: options.nameStrategy(options.extractStrategies(this.props.optionsSelected)), legs: this.props.optionsSelected }), (data) => {
                console.log(data);
            });
        } else {
            // Not Logged in, reroute the uesr to login
        }
    }

    deleteStrategy = (legs, name, ticker) => {
        console.log(legs, ticker)
        if (ticker != '' && this.state.loggedIn) {
            request.postFetchReqAuth('/api/strategy/delete', Cookie.get('token'), JSON.stringify({ id: Cookie.get('id'), ticker, legs, name }), (data) => {
                console.log(data);
                if(!data.error && data.deleted){
                    this.loadStrategy()
                }
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

    renderCards = (stockStrats, symbol) => {
        return stockStrats.map((strat) => (
            <List
                header={<div>
                    {strat.name}
                    <Button shape="circle" icon="right" onClick= {() => {}} />
                    <Button shape="circle" icon="delete" onClick={() => {this.deleteStrategy(strat.legs, strat.name, symbol)}} />
                </div>}
                bordered
                dataSource={strat.legs}
                renderItem={leg => (
                    <List.Item>
                        <Typography.Text>{`${leg.isLong ? "Buy" : "Write"} ${moment(leg.date).format("YYYY-MM-DD")} ${leg.strike} ${leg.isCall ? "CALL" : "PUT"}`}</Typography.Text>
                    </List.Item>
                )}
            />
        ))
    }

    renderTabs = () => {
        return Object.keys(this.state.strategies).map(i => (
            <TabPane tab={i} key={i}>
                {this.renderCards(this.state.strategies[i], i)}
            </TabPane>
        ))
    }

    render(){
        return (
            <div>
                <div id="saveButton"><Button  icon="save" loading= {this.state.loading} disabled= {!this.state.loggedIn} onClick={this.saveStrategy} /></div>
                <div id="savedStrategyButton"><Button icon="download"  loading= {this.state.loading} disabled= {!this.state.loggedIn} onClick={this.loadStrategy} /></div>
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
import React from 'react';
import { Table } from 'antd';

import verifyUser from './components/UserVerifier.jsx';
import Cookie from 'js-cookie'
import * as post from './jsLib/fetchLibrary.js';

const columns = [
  {
    title: 'Ticker',
    dataIndex: 'ticker',
  },
  {
    title: 'Name',
    dataIndex: 'name'
  },
  {
    title: 'Price',
    dataIndex: 'price'
  },
  {
    title: 'Put OI',
    dataIndex: 'putOI',
  },
  {
    title: 'Put Volume',
    dataIndex: 'putVol',
  },
  {
    title: 'Put IV',
    dataIndex: 'putIV',
  },
  {
    title: 'Call OI',
    dataIndex: 'callOI',
  },
  {
    title: 'Call Volume',
    dataIndex: 'callVol',
  },
  {
    title: 'Call IV',
    dataIndex: 'callIV',
  },
  {
    title: 'P/C Ratio',
    dataIndex: 'pcRatio',
  },
  {
    title: '% Change',
    dataIndex: 'change',
  },
];


class Watchlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      dataSource: [],
      watchlist: []
    };
    verifyUser(({ loggedIn, user, email }) => {
      this.setState(() => ({ loggedIn }), () => {
        post.fetchReqAuth('/api/watchlist/view', Cookie.get('token'), JSON.stringify({ id: Cookie.get('id')}), (data) => {
          this.setState(() => ({watchlist: data.list, dataSource: data.list.map(stock => {return {ticker: stock}})}), () => {
            for( let stock of this.state.watchlist ){
              post.fetchReq('/api/market/price', JSON.stringify({ticker: stock}), (data) => {
                this.setState((state) => {
                  let i = state.dataSource.findIndex(e => e.ticker == stock)
                  state.dataSource[i].price = data.price
                  state.dataSource[i].change = data.change
                  state.dataSource[i].name = data.name
                  return { dataSource: state.dataSource }
                })
              })
              post.fetchReq('/api/market/optionsQuote', JSON.stringify({ticker: stock}), (data) => {
                this.setState((state) => {
                  let i = state.dataSource.findIndex(e => e.ticker == stock)
                  state.dataSource[i].callIV = data.callIV
                  state.dataSource[i].callVol = data.callVol
                  state.dataSource[i].callOI = data.callOI
                  state.dataSource[i].putIV = data.putIV
                  state.dataSource[i].putVol = data.putVol
                  state.dataSource[i].putOI = data.putOI
                  state.dataSource[i].pcRatio = data.pcRatio
                  return { dataSource: state.dataSource }
                })
              })
            }
          })
        });
      });
    });
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [
        {
          key: 'all-data',
          text: 'Select All Data',
          onSelect: () => {
            this.setState({
              selectedRowKeys: [...Array(46).keys()], // 0...45
            });
          },
        }
      ],
    };
    return (
      <div className="tableWrapper">
        <div>
          <h1 className="title">Username's Watchlist</h1>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={this.state.dataSource} locale={{ emptyText: 'No watched tickers or User not logged in' }} />
      </div>
    );
  }
}

export default Watchlist;

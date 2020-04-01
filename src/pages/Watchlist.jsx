import React from 'react';
import { Table } from 'antd';

import Cookie from 'js-cookie';

import { utilique as util } from 'que-series';
import verifyUser from '../components/UserVerifier.jsx';

const { request } = util;

const columns = [
  {
    title: 'Ticker',
    dataIndex: 'ticker',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
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
    title: 'P/C Ratio OI',
    dataIndex: 'pcRatioOI',
  },
  {
    title: 'P/C Ratio Vol',
    dataIndex: 'pcRatioVol',
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
      watchlist: [],
    };
    verifyUser(({ loggedIn, user, email }) => {
      this.setState(() => ({ loggedIn }), () => {
        if (this.state.loggedIn) {
          request.postFetchReqAuth('/api/watchlist/view', Cookie.get('token'), JSON.stringify({ id: Cookie.get('id') }), (data) => {
            this.setState(() => ({ watchlist: data.list, dataSource: data.list.map((stock) => ({ ticker: stock })) }), () => {
              for (const stock of this.state.watchlist) {
                request.postFetchReq('/api/market/quote', JSON.stringify({ ticker: stock }), (data) => {
                  if(!data.error && data.quote != undefined){
                    data = data.quote
                    this.setState((state) => {
                      const i = state.dataSource.findIndex((e) => e.ticker == stock);
                      state.dataSource[i].price = data.price;
                      state.dataSource[i].change = data.change;
                      state.dataSource[i].name = data.name;
                      return { dataSource: state.dataSource };
                    });
                  }
                });
                request.postFetchReq('/api/market/optionsQuote', JSON.stringify({ ticker: stock }), (data) => {
                  if(!data.error && data.optionsQuote != undefined){
                    this.setState((state) => {
                      data = data.optionsQuote
                      const i = state.dataSource.findIndex((e) => e.ticker == stock);
                      state.dataSource[i].callIV = data.callIV;
                      state.dataSource[i].callVol = data.callVol;
                      state.dataSource[i].callOI = data.callOI;
                      state.dataSource[i].putIV = data.putIV;
                      state.dataSource[i].putVol = data.putVol;
                      state.dataSource[i].putOI = data.putOI;
                      state.dataSource[i].pcRatioOI = data.pcRatioOI;
                      state.dataSource[i].pcRatioVol = data.pcRatioVol;
                      return { dataSource: state.dataSource };
                    });
                  }
                  
                });
              }
            });
          });
        }
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
        },
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

import React from 'react';
import { Table, Typography } from 'antd';

import Cookie from 'js-cookie';

import { utilique as util } from 'que-series';
import verifyUser from '../components/UserVerifier.jsx';
import SpinningLogo from '../components/SpinningLogo.jsx';

const { request } = util;

const columns = [
  {
    title: 'Ticker',
    dataIndex: 'ticker',
    render: (text, record, index) => (
      <Typography>{ text != undefined && text.length != 0 ? text : '-'}</Typography>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text, record, index) => (
      <Typography>{ text != undefined && text.length != 0 ? text : '-'}</Typography>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    render: (text, record, index) => (
      <Typography>{ text != undefined ? `$${text}` : '-'}</Typography>
    ),
  },
  {
    title: 'Put OI',
    dataIndex: 'putOI',
    render: (text, record, index) => (
      <Typography>{ text != undefined ? text : '-'}</Typography>
    ),
  },
  {
    title: 'Put Volume',
    dataIndex: 'putVol',
    render: (text, record, index) => (
      <Typography>{ text != undefined ? text : '-'}</Typography>
    ),
  },
  {
    title: 'Put IV',
    dataIndex: 'putIV',
    render: (text, record, index) => (
      <Typography>{ text != undefined ? text : '-'}</Typography>
    ),
  },
  {
    title: 'Call OI',
    dataIndex: 'callOI',
    render: (text, record, index) => (
      <Typography>{ text != undefined ? text : '-'}</Typography>
    ),
  },
  {
    title: 'Call Volume',
    dataIndex: 'callVol',
    render: (text, record, index) => (
      <Typography>{ text != undefined ? text : '-'}</Typography>
    ),
  },
  {
    title: 'Call IV',
    dataIndex: 'callIV',
    render: (text, record, index) => (
      <Typography>{ text != undefined ? text : '-'}</Typography>
    ),
  },
  {
    title: 'P/C Ratio OI',
    dataIndex: 'pcRatioOI',
    render: (text, record, index) => (
      <Typography>{ text != undefined ? text : '-'}</Typography>
    ),
  },
  {
    title: 'P/C Ratio Vol',
    dataIndex: 'pcRatioVol',
    render: (text, record, index) => (
      <Typography>{ text != undefined ? text : '-'}</Typography>
    ),
  },
  {
    title: '% Change',
    dataIndex: 'change',
    render: (text, record, index) => (
      <Typography>{ text != undefined ? `${text} %` : '-'}</Typography>
    ),
  },
];


class Watchlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      dataSource: [],
      watchlist: [],
      username: 'Username',
      loading: true,
      requestsSent: 0,
    };

    const checkRequests = () => {
      this.setState((state) => ({ requestsSent: state.requestsSent + 1 }), () => {
        if (this.state.requestsSent === this.state.watchlist.length * 2) {
          this.setState(() => ({ loading: false }));
        }
      });
    };

    verifyUser(({ loggedIn, username, email }) => {
      this.setState(() => ({ loggedIn, username }), () => {
        if (this.state.loggedIn) {
          request.postFetchReqAuth('/api/watchlist/view', Cookie.get('token'), JSON.stringify({ id: Cookie.get('id') }), (data) => {
            this.setState(() => ({ watchlist: data.list, dataSource: data.list.map((stock) => ({ ticker: stock })) }), () => {
              for (const stock of this.state.watchlist) {
                request.postFetchReq('/api/market/quote', JSON.stringify({ ticker: stock }), (data) => {
                  if (!data.error && data.quote != undefined) {
                    data = data.quote;
                    this.setState((state) => {
                      const i = state.dataSource.findIndex((e) => e.ticker == stock);
                      state.dataSource[i].price = Math.round(100 * data.price) / 100;
                      state.dataSource[i].change = Math.round(100 * data.change) / 100;
                      state.dataSource[i].name = data.name;
                      return { dataSource: state.dataSource };
                    });
                  }
                  checkRequests();
                });

                request.postFetchReq('/api/market/optionsQuote', JSON.stringify({ ticker: stock }), (data) => {
                  if (!data.error && data.optionsQuote != undefined) {
                    this.setState((state) => {
                      data = data.optionsQuote;
                      const i = state.dataSource.findIndex((e) => e.ticker == stock);
                      state.dataSource[i].callIV = Math.round(100 * data.callIV) / 100;
                      state.dataSource[i].callVol = Math.round(100 * data.callVol) / 100;
                      state.dataSource[i].callOI = Math.round(100 * data.callOI) / 100;
                      state.dataSource[i].putIV = Math.round(100 * data.putIV) / 100;
                      state.dataSource[i].putVol = Math.round(100 * data.putVol) / 100;
                      state.dataSource[i].putOI = Math.round(100 * data.putOI) / 100;
                      state.dataSource[i].pcRatioOI = Math.round(100 * data.pcRatioOI) / 100;
                      state.dataSource[i].pcRatioVol = Math.round(100 * data.pcRatioVol) / 100;
                      return { dataSource: state.dataSource };
                    });
                  }
                  checkRequests();
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
          <h1 className="title">{`${this.state.username || 'Username'}\'s Watchlist`}</h1>
        </div>
        {!this.state.loading ? (
          <Table
            columns={columns}
            dataSource={this.state.dataSource}
            rowClassName={(record, index) => (record.change >= 0 ? 'watchlistUp' : 'watchlistDown')}
            locale={{ emptyText: 'No watched tickers or User not logged in' }}
          />
        ) : <SpinningLogo /> }
      </div>
    );
  }
}

export default Watchlist;

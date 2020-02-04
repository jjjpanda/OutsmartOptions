import React from 'react';
import { Table } from 'antd';
import Cookies from 'js-cookie';
import * as post from './jsLib/fetchLibrary.js';
import './css/watchlist.less';

const columns = [
  {
    title: 'Ticker',
    dataIndex: 'ticker',
  },
  {
    title: 'Put OI',
    dataIndex: 'putOI',
  },
  {
    title: 'Put Volume',
    dataIndex: 'putVolume',
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
    dataIndex: 'callVolume',
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
    dataIndex: 'percentChange',
  },
];


class Watchlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
    };
  }

  checkLogin = () => {
    
  }

  render() {

    Cookies.set('token',
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMzBhMDU5ZDdiOGRkMDlkY2VhZTMzZiIsIm5hbWUiOiJtYW5nbyIsImlhdCI6MTU4MDg1MDcyNywiZXhwIjoxNjEyNDA3NjUzfQ.C8Sjr7hZqpNYjO5F2wZ1cmOXeUPv-rUfX5wBWrdq5g8');
    Cookies.set('id',
  '5e30a059d7b8dd09dceae33f');

  console.log(Cookies.get('token'))
    console.log(Cookies.get('id'))
    post.fetchReqAuth('/api/users/current', Cookies.get('token'), JSON.stringify({ id: Cookies.get('id') }), (data) => {
      console.log('burhoudnk')
      console.log(data);
    });

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
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };
    return (
      <div className='tableWrapper'>
        <div>
          <h1 className="title">Username's Watchlist</h1>
        </div>
        <Table rowSelection={rowSelection} columns={columns} dataSource={[]} locale={{ emptyText: 'No watched tickers or User not logged in' }} />
      </div>
    );
  }
}

export default Watchlist;

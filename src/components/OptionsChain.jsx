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
} from 'antd';

import SpinningLogo from './SpinningLogo.jsx';

const CollapsePanel = Collapse.Panel;

class OptionsChain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addLegModalVisible: false,
    };
  }

    columns = (expiry) => [
      {
        title: '',
        dataIndex: 'callAction',
        width: '10%',
        render: (text, row) => (this.props.editLegLoading.includes(row.callSymbol) ? <SpinningLogo /> : <Checkbox disabled={isNaN(row.callIV)} checked={this.props.optionsSelected.some((option) => option.key === row.callSymbol) || false} onChange={(e) => { this.props.onHandleOptionLegChange(e.target.checked, true, true, row.strike, row.call, row.call, expiry, row.callIV, row.callSymbol); }} />),
      },
      {
        title: 'Call',
        dataIndex: 'call',
      },
      {
        title: 'Call Vol',
        dataIndex: 'callVol',
        width: '10%',
        render: (text, row) => (row.callOutlier ? (<strong>{text}</strong>) : (<div>{text}</div>)),
      },
      {
        title: 'Call IV',
        dataIndex: 'callIV',
        render: (text) => (<div>{isNaN(text) || text === null ? '-' : text.toFixed(2)}</div>),
      },
      {
        title: 'Strike',
        dataIndex: 'strike',
      },
      {
        title: 'Put',
        dataIndex: 'put',
      },
      {
        title: 'Put Vol',
        dataIndex: 'putVol',
        render: (text, row) => (row.putOutlier ? (<strong>{text}</strong>) : (<div>{text}</div>)),
      },
      {
        title: 'Put IV',
        dataIndex: 'putIV',
        render: (text) => (<div>{isNaN(text) || text === null ? '-' : text.toFixed(2)}</div>),
      },
      {
        title: '',
        dataIndex: 'putAction',
        render: (text, row) => (this.props.editLegLoading.includes(row.putSymbol) ? <SpinningLogo /> : <Checkbox disabled={isNaN(row.putIV)} checked={this.props.optionsSelected.some((option) => option.key === row.putSymbol) || false} onChange={(e) => { this.props.onHandleOptionLegChange(e.target.checked, false, true, row.strike, row.put, row.put, expiry, row.putIV, row.putSymbol); }} />),
      },
    ]

    setAddLegModalVisible(addLegModalVisible) {
      this.setState({ addLegModalVisible });
    }

    openOptionsChainModal = () => this.setAddLegModalVisible(true)

    closeOptionsChainModal = () => this.setAddLegModalVisible(false)

    renderOptionsChain = () => this.props.optionsChain.map((e) => (
      <CollapsePanel key={`${e[0]}_optionexpiries`} header={e[0]} extra={this.props.modalTrackSelected(e[0])}>
        <div step-name={`${e[0]}_optionexpiries`}>
          <Table
            dataSource={e[1]}
            columns={this.columns(e[0])}
            rowClassName={(record) => (record.atm ? 'atmStrike' : '')}
            pagination={false}
            size="small"
            scroll={{ y: 500 }}
          />
        </div>
      </CollapsePanel>
    ))

    render() {
      return (
        <div id="addLegButton" step-name="edit-leg">
          <Button icon="edit" disabled={this.props.optionsChain[0] == undefined ? true : (this.props.optionsChain[0][0] == 'Empty')} onClick={this.openOptionsChainModal}>Edit Legs</Button>
          <div className="addLegButtonWrapper">
            <div>
              <Modal
                title="Add Leg"
                centered
                width="50%"
                visible={this.state.addLegModalVisible}
                footer={(
                  <Button key="ok" step-name="ok-button-modal" type="primary" onClick={this.closeOptionsChainModal}>
                    Ok
                  </Button>
                        )}
                onCancel={this.closeOptionsChainModal}
              >
                <div step-name="edit-leg-modal">
                  <Collapse accordion>
                    {this.renderOptionsChain()}
                  </Collapse>
                </div>

              </Modal>
            </div>
          </div>
        </div>
      );
    }
}

export default OptionsChain;

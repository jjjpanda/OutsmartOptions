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

import { NoAxisGraph, ProfitGraph } from './Graphs.jsx';

const CollapsePanel = Collapse.Panel;

class IVSkew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ivSkewModalVisible: false,
    };
  }

  setIVSkewModalVisible(ivSkewModalVisible) {
    this.setState({ ivSkewModalVisible });
  }

    renderIVSkew = () => this.props.optionsChain.map((e) => (
      <CollapsePanel key={`${e[0]}_ivexpiries`} header={e[0]} extra={this.props.modalTrackSelected(e[0])}>
        <div className="IVSkewGraphs">
          <div id="IVGraph1">
            <NoAxisGraph data={e[1]} xKey="strike" dataKey="callIV" />
          </div>
          <div id="IVGraph2">
            <NoAxisGraph data={e[1]} xKey="strike" dataKey="putIV" />
          </div>
        </div>
      </CollapsePanel>
    ))

    render() {
      return (
        <div id="ivSkewButton">
          <Button
            icon="profile"
            disabled={this.props.optionsChain[0] == undefined ? true : (this.props.optionsChain[0][0] == 'Empty')}
            onClick={() => this.setIVSkewModalVisible(true)}
          >
            IV Skew
          </Button>
          <div className="addLegButtonWrapper">
            <Modal
              title="IV Skew"
              centered
              width="50%"
              visible={this.state.ivSkewModalVisible}
              footer={(
                <Button key="ok" type="primary" onClick={() => this.setIVSkewModalVisible(false)}>
                  Ok
                </Button>
                        )}
              onCancel={() => this.setIVSkewModalVisible(false)}
            >
              <Collapse accordion>
                {this.renderIVSkew()}
              </Collapse>
            </Modal>
          </div>
        </div>
      );
    }
}

export default IVSkew;

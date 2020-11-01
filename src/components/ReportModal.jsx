import React from 'react';
import {
  Input,
  InputNumber,
  Button,
  Switch,
  Modal,
  Table,
} from 'antd';

import {
  aesthetique as aes,
  mathematique as math,
  utilique as util,
} from 'que-series';

import html2canvas from 'html2canvas';
import SpinningLogo from './SpinningLogo.jsx';

const { request, structure } = util;

class ReportModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reportLoading: false,
    };
  }

    sendCalcError = () => {
      this.setState(() => ({ reportLoading: true }), () => {
        const input = document.getElementsByTagName('html')[0];
        html2canvas(input).then((c) => {
          const base64image = c.toDataURL('image/png');
          const formData = new FormData();
          formData.append('file', structure.dataURItoBlob(base64image), 'img');
          request.fileReq('/api/bug/imageReport', formData);
        });
        request.postFetchReq('/api/bug/report',
          JSON.stringify({
            options: this.props.optionsSelected
              .map((option) => Object.keys(option).filter((key) => key != 'profit')
                .reduce((obj, key) => {
                  obj[key] = option[key];
                  return obj;
                },
                {})),
          }),
          (data) => {
            this.setState(() => ({ reportLoading: false }));
          });
      });
    }

    render() {
      return (
        <div>
          <Button onClick={this.sendCalcError} loading={this.state.reportLoading}>Report Calculation Error</Button>
          <Modal
            visible={this.state.reportLoading}
            closable={false}
            maskClosable={false}
            footer={null}
          >
            <SpinningLogo />
          </Modal>
        </div>
      );
    }
}

export default ReportModal;

import React from 'react';
import {
  Spin,
  Icon,
} from 'antd';

import logo from '../img/logo.png';

const spin = <Icon component={() => (<img key="mainLogo" id="logo" className="spin" src={logo} />)} />;

class SpinningLogo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Spin indicator={spin} />
    );
  }
}

export default SpinningLogo;

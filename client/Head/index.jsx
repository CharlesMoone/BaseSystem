import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  Layout,
  Icon,
  Tooltip,
  message,
} from 'antd';
import PropTypes from 'prop-types';

import style from './style.css';

const {
  Header
} = Layout;


class Head extends Component {
  static propTypes = {
    toggle: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {};

    this.logout = ::this.logout;
  }

  render() {
    return (
      <Header style={this.props.style} className={style.header}>
        <Icon className={style.trigger} type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.props.toggle} />
        <div className={style.placeholder}></div>
        <Tooltip placement='bottom' title='logout'><Icon className={style.logout} type='poweroff' /></Tooltip>
      </Header>
    );
  }
}


export default connect(state => state)(Head);
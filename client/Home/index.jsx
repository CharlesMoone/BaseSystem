import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  Layout
} from 'antd';
import {
  withRouter
} from 'react-router';
import {
  Switch,
  Route
} from 'react-router-dom';

import * as actions from './actions';
import Head from '../Head';
import style from './style.css';
import Bundle from 'bundle';

import loadHelloworld from 'bundle-loader?lazy&name=Helloworld!../Helloworld';


const {
  Sider,
  Content,
} = Layout;

const Helloworld = () => (
  <Bundle load={loadHelloworld}>
    {Helloworld => <Helloworld />}
  </Bundle>
);

@withRouter
@connect(state => state)
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
    };

    this.toggle = ::this.toggle;
  }

  componentDidMount() {
    this.props.dispatch(actions.someActions());
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={style.logo} />
        </Sider>
        <Layout>
          <Head style={{ background: '#fff', padding: 0 }} collapsed={this.state.collapsed} toggle={this.toggle} />
          <Content style={{ margin: '0 16px' }}>
            <Switch>
              <Route exact path='/sys/' render={() => <div />} />
              <Route path='/sys/helloworld' component={Helloworld} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
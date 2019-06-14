import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import { routes, RouteWithSubRoutes } from '../routes';

const { Header, Sider, Content } = Layout;

class App extends Component {
    state = {
        collapsed: false,
    }
    toggle = () => this.setState((prevState) => ({collapsed: !prevState.collapsed}))
    render() {
        return (
            <Layout style={{height: '100%'}}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div style={{ height: 32, backgroundColor: 'rgba(255, 255, 255, 0.2)', margin: 16 }} />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.props.location.pathname]}>
                        <Menu.Item key="/">
                            <Link to="/" >
                                <Icon type="user" />
                                <span>首页</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/about">
                            <Link to="/about" >
                                <Icon type="video-camera" />
                                <span>关于</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                          type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                          onClick={this.toggle}
                          style={{ padding: '0px 24px' }}
                        />
                    </Header>
                    <Content style={{ margin: '24px 16px', overflow: 'initial' }}>
                        <div style={{ padding: 24, background: '#fff', marginBottom: 24 }}>
                            <Switch>
                                {routes.map((route, i) => (
                                    <RouteWithSubRoutes key={i} {...route} />
                                ))}
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default hot(withRouter(App));

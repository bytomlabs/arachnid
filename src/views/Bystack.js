import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import Apply from './bystack/Apply';

const { Header, Content, Sider } = Layout;

class Bystack extends React.Component {

  render() {

    const defaultKey = this.props.location.pathname === '/' ? '/issue' : this.props.location.pathname;

    return (
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
        >
          <div style={{padding: '15px 30px 10px 15px'}}>
          <h1 style={{color: '#fff',fontWeight: '300',fontSize: 22,textAlign: 'center', background: 'rgba(255, 255, 255, 0.2)',}}>Bitcore</h1>
          </div>
          <Menu theme="dark" mode="inline" selectedKeys={[defaultKey]} defaultSelectedKeys={['/bystack/apply']}>
            <Menu.Item key="/bystack/apply">
              <Link to="/bystack/apply"><Icon type="exclamation-circle" />报名信息</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Header style={{ background: '#fff', padding: 0 }}>
            
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 880,
            }}
          >
            <Switch>
              <Route exact path="/bystack/apply" render={(props) => <Apply {...props} />} />
              <Redirect to="/bystack/apply" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Bystack;
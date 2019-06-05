import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import Metting from './Meeting';
import BitcoinDev from './BitcoinDev';
import Question from './Question';
import Issue from './Issue';
import Paper from './Paper';

const { Header, Content, Sider } = Layout;


class Home extends React.Component {

  render() {

    const defaultKey = this.props.location.pathname === '/' ? '/issue' : this.props.location.pathname;
    console.log(defaultKey)

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
          <div style={{padding: '15px 30px 0 15px'}}>
          <h1 style={{color: '#fff',fontWeight: '300',fontSize: 22,textAlign: 'center', background: 'rgba(255, 255, 255, 0.2)',}}>Bitcore</h1>
          </div>
          <Menu theme="dark" mode="inline" selectedKeys={[defaultKey]} defaultSelectedKeys={['/issue']}>
            <Menu.Item key="/issue">
              <Link to="/issue"><Icon type="exclamation-circle" />Github Issue</Link>
            </Menu.Item>
            <Menu.Item key="/meeting">
              <Link to="/meeting"><Icon type="team" />Meeting</Link>
            </Menu.Item>
            <Menu.Item key="/bitcoin">
              <Link to="/bitcoin"><Icon type="code" />Dev (Maillist)</Link>
            </Menu.Item>
            <Menu.Item key="/question">
              <Link to="/question"><Icon type="question-circle" />Stack Exchange</Link>
            </Menu.Item>
            <Menu.Item key="/paper">
              <Link to="/paper"><Icon type="question-circle" />Paper</Link>
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
              <Route exact path="/meeting" render={(props) => <Metting {...props} />} />
              <Route exact path="/bitcoin" render={(props) => <BitcoinDev {...props} />} />
              <Route exact path="/question" render={(props) => <Question {...props} />} />
              <Route exact path="/issue" render={(props) => <Issue {...props} />} />
              <Route exact path="/paper" render={(props) => <Paper {...props} />} />
              <Redirect to="/issue" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import { Switch, Route, Link, Redirect } from 'react-router-dom';

import Metting from './Meeting';
import BitcoinDev from './BitcoinDev';
import Question from './Question';
import Issue from './Issue';
import Paper from './Paper';
import Favorites from './Favorites';

const { Header, Content, Sider } = Layout;


class Home extends React.Component {

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
          <Menu theme="dark" mode="inline" selectedKeys={[defaultKey]} defaultSelectedKeys={['/issue']}>
            <Menu.Item key="/bitcore/issue">
              <Link to="/bitcore/issue"><Icon type="exclamation-circle" />Github Issue</Link>
            </Menu.Item>
            <Menu.Item key="/bitcore/meeting">
              <Link to="/bitcore/meeting"><Icon type="team" />Meeting</Link>
            </Menu.Item>
            <Menu.Item key="/bitcore/bitcoin">
              <Link to="/bitcore/bitcoin"><Icon type="code" />Dev (Maillist)</Link>
            </Menu.Item>
            <Menu.Item key="/bitcore/question">
              <Link to="/bitcore/question"><Icon type="question-circle" />Stack Exchange</Link>
            </Menu.Item>
            <Menu.Item key="/bitcore/paper">
              <Link to="/bitcore/paper"><Icon type="file-word" />Paper</Link>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="/bitcore/star">
              <Link to="/bitcore/star"><Icon type="star" />Favorites</Link>
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
              <Route exact path="/bitcore/meeting" render={(props) => <Metting {...props} />} />
              <Route exact path="/bitcore/bitcoin" render={(props) => <BitcoinDev {...props} />} />
              <Route exact path="/bitcore/question" render={(props) => <Question {...props} />} />
              <Route exact path="/bitcore/issue" render={(props) => <Issue {...props} />} />
              <Route exact path="/bitcore/paper" render={(props) => <Paper {...props} />} />
              <Route exact path="/bitcore/star" render={(props) => <Favorites {...props} />} />
              <Redirect to="/bitcore/issue" />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import zh_CN from './conf/locales/zh-CN';
import en_US from './conf/locales/en-US';

import Home from './views/Home';
import Bystack from './views/Bystack';
import './assets/common.scss';

addLocaleData([...en, ...zh]);

const mapStateToProps = (state) => ({
  config: state.config,
})
@connect(mapStateToProps, { })
class App extends PureComponent {

  constructor (props) {
    super(props);
    this.state = {
      lang: ''
    }
  }
  
  render() {
    const { config } = this.props;
    return (
      <IntlProvider
        locale={config.lang}
        messages={{zh: zh_CN, en: en_US}[config.lang]}
      >
        <div>
          <BrowserRouter>
            <Switch>
              <Route path="/bitcore" render={(props) => <Home {...props} />} />
              <Redirect to="/bitcore" />
            </Switch>
          </BrowserRouter>
        </div>
      </IntlProvider>
    );
  }
}

export default hot(module)(App);

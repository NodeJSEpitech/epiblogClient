/* REACT */
import React from 'react';

/* MATERIAL-UI */
import { MuiThemeProvider } from 'material-ui';

import { Provider } from 'react-redux';
//
import { ConnectedRouter } from 'react-router-redux';

/* COMPONENTS */
import TopBar from './components/TopBar';
import ChatWindow from './components/ChatWindow';

import Routes from './Routes';

import { store, history } from './redux/store';

import UserActions from './redux/actions/user';
import api from './libs/apiCallLib';
import AuthenticationActions from './redux/actions/authentication';
import SocketContext from './modules/socket';

import './index.css';

function App() {
  store.dispatch(AuthenticationActions.init());
  api.get('/me')
    .then(me => (store.dispatch(UserActions.setUser(me.data))));

  return (
    <Provider store={store}>
      <SocketContext.Provider>
        <ConnectedRouter history={history}>
          <MuiThemeProvider>
            <div>
              <TopBar title="Epiblog" />
              <Routes />
              <ChatWindow />
            </div>
          </MuiThemeProvider>
        </ConnectedRouter>
      </SocketContext.Provider>
    </Provider>
  );
}

export default App;

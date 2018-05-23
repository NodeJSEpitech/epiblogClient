/* REACT */
import React from 'react';

/* MATERIAL-UI */
import { MuiThemeProvider } from 'material-ui';

/* REDUX */
// import {
//   createStore,
//   combineReducers,
//   applyMiddleware,
// } from 'redux';
//
import { Provider } from 'react-redux';
//
import {
  ConnectedRouter,
  // routerReducer,
  // routerMiddleware,
} from 'react-router-redux';
// import createHistory from 'history/createHashHistory';

/* COMPONENTS */
import TopBar from './components/TopBar';
import ChatWindow from './components/ChatWindow';

// import authenticationReducer from './modules/authentication/reducer';
// Or wherever you keep your reducers
import Routes from './Routes';

import { store, history } from './redux/store';

import './index.css';

// Build the middleware for intercepting and dispatching navigation actions
// const middleware = routerMiddleware(history);


// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
// const store = createStore(
//   combineReducers({
//     authenticationReducer,
//     router: routerReducer,
//   }),
//   applyMiddleware(middleware),
// );

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider>
          <div>
            <TopBar title="Epiblog" />
            <Routes />
            <ChatWindow />
          </div>
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;

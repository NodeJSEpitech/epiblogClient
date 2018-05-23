/* REDUX */
import { createStore } from 'redux';
import createHistory from 'history/createHashHistory';

import reducers from './reducers';

export const store = createStore(reducers);

export const history = createHistory();

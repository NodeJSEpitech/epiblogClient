import Immutable from 'immutable';
import LocalStorage from 'localStorage';

// Add eslint rule exception
/* eslint new-cap: ["error", { "newIsCapExceptionPattern": "fromJS" }] */
const defaultState = new Immutable.fromJS({
  token: LocalStorage.getItem('token'),
  error: false,
});


function destroyToken(state) {
  const nextState = state;

  LocalStorage.removeItem('token');
  return nextState.set('token', null);
} // <= destroyToken

function setToken(state, token) {
  const nextState = state;

  LocalStorage.setItem('token', token);
  return nextState.set('token', token);
} // <= setToken


function authenticationReducer(state = defaultState, action) {
  switch (action.type) {
    case 'SIGNUP_CREATE':
      return setToken(state, action.token);

    case 'AUTHENTICATION_CREATE':
      return setToken(state, action.token);

    case 'AUTHENTICATION_INIT': {
      const curToken = LocalStorage.getItem('token');
      if (curToken && curToken.length) {
        return setToken(defaultState, curToken);
      }

      return state;
    }

    case 'AUTHENTICATION_DESTROY':
      return destroyToken(defaultState);

    default:
      return state;
  }
}

export default authenticationReducer;

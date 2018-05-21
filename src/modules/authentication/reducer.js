import Immutable from 'immutable';
import LocalStorage from 'localStorage';

// Add eslint rule exception
/* eslint new-cap: ["error", { "newIsCapExceptionPattern": "fromJS" }] */
const defaultState = new Immutable.fromJS({
  token: LocalStorage.getItem('token'),
  error: false,
});


function destroyToken() {
  let nextState;

  LocalStorage.removeItem('token');
  return nextState.set('token', null);
} // <= destroyToken

function setToken(state, token) {
  let nextState;

  LocalStorage.setItem('token', token);
  return nextState.set('token', token);
} // <= setToken

function failureToken(state) {
  return state.set('error', true);
} // <= failureToken

function resetToken(state) {
  return state.set('error', false);
} // <= resetToken


function authenticationReducer(state = defaultState, action) {
  switch (action.type) {
    case 'SIGNUP_CREATE_SUCCESS':
      return setToken(state, action.data.data.token);

    case 'SIGNUP_CREATE_FAILURE':
      return failureToken(defaultState);

    case 'AUTHENTICATION_CREATE_SUCCESS':
      return setToken(state, action.data.data.token);

    case 'AUTHENTICATION_INIT': {
      const curToken = LocalStorage.getItem('token');

      if (curToken && curToken.length) {
        return setToken(defaultState, curToken);
      }

      return state;
    }

    case 'AUTHENTICATION_DESTROY':
      return destroyToken(defaultState);

    case 'AUTHENTICATION_CREATE_FAILURE':
      return failureToken(defaultState);

    case 'AUTHENTICATION_FAILURE_RESET':
      return resetToken(defaultState);

    default:
      return state;
  }
}

export default authenticationReducer;

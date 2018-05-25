import Immutable from 'immutable';

// Add eslint rule exception
/* eslint new-cap: ["error", { "newIsCapExceptionPattern": "fromJS" }] */
const defaultState = new Immutable.fromJS({
  user: null,
});


function authenticationReducer(state = defaultState, action) {
  const nextState = state;
  switch (action.type) {
    case 'USER_SET':
      return nextState.set('user', action.user);

    case 'USER_DESTROY':
      return nextState.set('user', null);

    default:
      return state;
  }
}

export default authenticationReducer;

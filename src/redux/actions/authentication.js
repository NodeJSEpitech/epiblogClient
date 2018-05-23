import { ApiCallLib } from '../../libs';

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------

function signup(signupParams) {
  return {
    type: 'SIGNUP_CREATE',
    promise: ApiCallLib.post('/user/register', {
      firstName: signupParams.firstName,
      lastName: signupParams.lastName,
      email: signupParams.email,
      password: signupParams.password,
      type: 0,
      deviceId: 'id_de_mon_device',
    }),
  };
} // <= create

function create(tokn) {
  return {
    type: 'AUTHENTICATION_CREATE',
    token: tokn,
  };
} // <= create

// --------------------------------------------------------------------------------

function destroy() {
  return {
    type: 'AUTHENTICATION_DESTROY',
  };
} // <= destroy

// --------------------------------------------------------------------------------

function init() {
  return {
    type: 'AUTHENTICATION_INIT',
  };
}

// --------------------------------------------------------------------------------

function reset() {
  return {
    type: 'AUTHENTICATION_FAILURE_RESET',
  };
}

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------


export default {
  create,
  destroy,
  init,
  reset,
  signup,
};

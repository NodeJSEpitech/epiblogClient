
function setUser(user) {
  return {
    type: 'USER_SET',
    user,
  };
}

function destroyUser(user) {
  return {
    type: 'USER_DESTROY',
    user,
  };
}


export default {
  setUser,
  destroyUser,
};

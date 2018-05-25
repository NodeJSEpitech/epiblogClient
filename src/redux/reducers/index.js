import { combineReducers } from 'redux';

import PostsReducer from './posts';
import authenticationReducer from './authentication';
import userReducer from './user';

export default combineReducers({
  posts: PostsReducer,
  authentication: authenticationReducer,
  user: userReducer,
});

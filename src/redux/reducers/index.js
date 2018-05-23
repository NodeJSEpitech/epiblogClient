import { combineReducers } from 'redux';

import PostsReducer from './posts';
import authenticationReducer from './authentication';

export default combineReducers({
  posts: PostsReducer,
  authentication: authenticationReducer,
});

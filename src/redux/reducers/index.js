import { combineReducers } from 'redux';

import PostsReducer from './posts';
import MessagesReducer from './messages';
import authenticationReducer from './authentication';
import userReducer from './user';

export default combineReducers({
  posts: PostsReducer,
  messages: MessagesReducer,
  authentication: authenticationReducer,
  user: userReducer,
});

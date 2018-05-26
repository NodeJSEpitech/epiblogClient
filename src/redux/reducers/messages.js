import { ADD_MESSAGE, SEND_MESSAGE } from '../actionTypes';
import webSocket from '../../modules/socket';

const MessagesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE:
    {
      const messages = [...state];
      messages.push(action.payload);
      console.log("action")
      console.log(action)
      return messages;
    }
    case SEND_MESSAGE:
    {
      const messages = [...state];
      const req = {
        'x-method': 'post',
        body: 'coucou',
        'x-username': 'guest',
      };
      console.log(req);

      webSocket.sendEvent(req);
      return messages;
    }
    default:
      return state;
  }
};

export default MessagesReducer;

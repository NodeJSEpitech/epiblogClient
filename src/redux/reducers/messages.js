import { ADD_MESSAGE, SEND_MESSAGE } from '../actionTypes';
import webSocket from '../../modules/socket';

const MessagesReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE:
    {
      const messages = [...state];
      messages.push(action.payload);
      return messages;
    }
    case SEND_MESSAGE:
    {
      const messages = [...state];
      console.log(action);
      const req = {
        'x-method': 'post',
        body: action.payload.data.text,
        'x-username': action.payload.author,
      };

      webSocket.sendEvent(req);
      return messages;
    }
    default:
      return state;
  }
};

export default MessagesReducer;

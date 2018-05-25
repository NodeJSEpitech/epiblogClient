import { FETCH_MESSAGES, SEND_MESSAGE } from '../actionTypes';

const MessagesReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_MESSAGES:
      return {
        ...state,
        messages: action.payload,
      };
    case SEND_MESSAGE:
    {
      const messages = [...state];
      messages.push(action.payload);
      return messages;
    }
    default:
      return state;
  }
};

export default MessagesReducer;

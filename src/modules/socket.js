import { store } from '../redux/store';
import { fetchComments } from '../redux/actions/comments';
import { fetchMessages } from '../redux/actions/messages';
// const socket = new WebSocket('ws://epiblog-api.herokuapp.com');
const socket = new WebSocket('ws://localhost:5000');

socket.onmessage = (message) => {
  const dataParsed = JSON.parse(message.data);
  if (dataParsed && dataParsed.type === 'comments') {
    store.dispatch(fetchComments(dataParsed.data));
  } else {
    // store.dispatch(fetchMessages(dataParsed.data));
  }
};

const sendEvent = (event) => {
  socket.send(JSON.stringify(event));
};

export default {
  sendEvent,
};

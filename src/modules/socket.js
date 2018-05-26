import { store, history } from '../redux/store';
import { addMessage } from '../redux/actions/messages';
import { fetchComments } from '../redux/actions/comments';
import { fetchMessages } from '../redux/actions/messages';

// const socket = new WebSocket('ws://epiblog-api.herokuapp.com');
const socket = new WebSocket('ws://localhost:5000');

const sendEvent = (event) => {
  socket.send(JSON.stringify(event));
};

socket.onmessage = (message) => {
  const dataParsed = JSON.parse(message.data);
  if (dataParsed && dataParsed.type === 'comments' && !dataParsed.id) {
    store.dispatch(fetchComments(dataParsed.data));
  } else if (dataParsed && dataParsed.type === 'comments' && dataParsed.id) {
    const tmp = history.location.pathname.split('/');
    console.log(Number(tmp[tmp.length - 1]) === dataParsed.id);
    console.log(Number(tmp[tmp.length - 1]) + " === " + dataParsed.id);

    if (Number(tmp[tmp.length - 1]) === dataParsed.id) {
      sendEvent({
        'x-method': 'get',
        'x-post-id': tmp[tmp.length - 1],
      });
    }
  } else if (!dataParsed.status) {
    const username = store.getState().user.get('user').username;
    let who = 'them';
    if (username === dataParsed.username) {
      who = 'me';
    }
    store.dispatch((addMessage({
      author: who,
      type: 'text',
      data: { text: who === 'me' ? dataParsed.content : `${dataParsed.username} said : \n${dataParsed.content}` },
    })));
  }
};

export default {
  sendEvent,
};

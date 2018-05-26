import { store } from '../redux/store';
import { addMessage } from '../redux/actions/messages';
import { fetchComments } from '../redux/actions/comments';
import { fetchMessages } from '../redux/actions/messages';

//const socket = new WebSocket('ws://epiblog-api.herokuapp.com');
const socket = new WebSocket('ws://localhost:5000');

socket.onmessage = (message) => {
  console.log(message);
    const dataParsed = JSON.parse(message.data);
    if (dataParsed && dataParsed.type === 'comments') {
        store.dispatch(fetchComments(dataParsed.data));
    } else if (!dataParsed.status) {
        const username = store.getState().user.get('user').username;
        let who = 'them';
        if (username === dataParsed.username) {
            who = 'me'
        }
        console.log(dataParsed)
        store.dispatch((addMessage({
            author: who,
            type: 'text',
            data: { text: who === "me" ? dataParsed.content : `${dataParsed.username} said : \n${dataParsed.content}` }
        })));
    }
};

const sendEvent = (event) => {
    socket.send(JSON.stringify(event));
};

export default {
    sendEvent,
};

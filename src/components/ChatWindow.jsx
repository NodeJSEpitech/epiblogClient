import React, { Component } from 'react';
import { Launcher } from 'react-chat-window';
import { connect } from 'react-redux';

import { sendMessage } from '../redux/actions/messages';

const mapStateToProps = ({ messages }) => ({
  messages,
});

const mapDispatchToProps = dispatch => ({
  sendMessage: (message) => {
    dispatch(sendMessage(message));
  },
});

class ChatWindow extends Component {
  constructor() {
    super();
<<<<<<< HEAD
    this.state = {
      messageList: [{
        author: 'them',
        type: 'text',
        data: {
          text: 'Salut',
        },
      },
      {
        author: 'them',
        type: 'text',
        data: {
          text: "Quelqu'un est up?",
        },
      },
      {
        author: 'me',
        type: 'text',
        data: {
          text: 'yep',
        },
      }],
    };

    this.onMessageWasSent = this.onMessageWasSent.bind(this);
=======

    this.onMessageWasSent = this.onMessageWasSentHandler.bind(this);
>>>>>>> 192503bb311f12678506c16ade5ee844c2028bfb
  }

  componentDidMount() {
    // console.log(this.props);
  }


  onMessageWasSentHandler(message) {
    this.props.sendMessage(message);
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Launcher
          agentProfile={{
            teamName: 'EpiBlog',
            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
          }}
          onMessageWasSent={this.onMessageWasSent}
<<<<<<< HEAD
          messageList={this.state.messageList}
=======
          messageList={this.props.messages}
>>>>>>> 192503bb311f12678506c16ade5ee844c2028bfb
          showEmoji
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);

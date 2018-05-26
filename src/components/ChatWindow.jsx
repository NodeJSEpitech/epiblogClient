import React, { Component } from 'react';
import { Launcher } from 'react-chat-window';
import { connect } from 'react-redux';

import { sendMessage } from '../redux/actions/messages';
import socket from '../modules/socket';

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

    this.onMessageWasSent = this.onMessageWasSentHandler.bind(this);
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
      <Launcher
        agentProfile={{
          teamName: 'EpiBlog',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
        }}
        onMessageWasSent={this.onMessageWasSent}
        messageList={this.props.messages}
        showEmoji
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);

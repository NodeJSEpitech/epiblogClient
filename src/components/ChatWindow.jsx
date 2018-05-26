import React, { Component } from 'react';
import { Launcher } from 'react-chat-window';
import { connect } from 'react-redux';

import { sendMessage } from '../redux/actions/messages';
import socket from '../modules/socket';

const mapStateToProps = ({ messages, user }) => ({
  messages,
  username: user.get('user').username,
});

const mapDispatchToProps = dispatch => ({
  sendMessage: (message) => {
    dispatch(sendMessage(message));
  },
});

class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
    };

    this.onMessageWasSent = this.onMessageWasSentHandler.bind(this);
  }

  componentDidMount() {
    // console.log(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      username: nextProps.username,
    });
  }

  onMessageWasSentHandler(message) {
    const req = message;
    req.author = this.state.username;
    this.props.sendMessage(message);
  }

  render() {
    return (
      <Launcher
        agentProfile={{
          teamName: 'EpiBlog',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
        }}
        onMessageWasSent={this.onMessageWasSent}
        messageList={this.props.messages}
        showEmoji={false}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatWindow);

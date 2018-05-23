import React, { Component } from 'react';
import { Launcher } from 'react-chat-window';

class ChatWindow extends Component {
  constructor() {
    super();
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
  }

  onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message],
    });
  }

  sendMessage(text) {
    if (text.length > 0) {
      this.setState({
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text },
        }],
      });
    }
  }

  render() {
    return (
      <div>
        <Launcher
          agentProfile={{
            teamName: 'EpiBlog',
            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
          }}
          onMessageWasSent={this.onMessageWasSent.bind(this)}
          messageList={this.state.messageList}
          showEmoji
        />
      </div>
    );
  }
}
export default ChatWindow;

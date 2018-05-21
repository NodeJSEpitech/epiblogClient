import React from 'react';
import Posts from '../../components/Posts';

import { api } from '../../libs/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: [{
        id: 1,
        name: 'Lorem ipsum dolor sit ame',
        description: 'consectetur adipiscing elit',
        content: ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      }, {
        id: 2,
        name: 'Lorem ipsum dolor sit ame',
        description: 'consectetur adipiscing elit',
        content: ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      }, {
        id: 3,
        name: 'Lorem ipsum dolor sit ame',
        description: 'consectetur adipiscing elit',
        content: ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      }, {
        id: 4,
        name: 'Lorem ipsum dolor sit ame',
        description: 'consectetur adipiscing elit',
        content: ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      }, {
        id: 5,
        name: 'Lorem ipsum dolor sit ame',
        description: 'consectetur adipiscing elit',
        content: ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      }],
    };
  }

  componentWillMount() {
    api.get('/posts')
      .then((response) => {
        this.setState({
          posts: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container">
        <div>
          <h1>Epi Blog Deployed</h1>
          <h3>Liste des posts, enjoy!</h3>
        </div>
        <Posts posts={this.state.posts} />
      </div>
    );
  }
}

export default Home;

import React from 'react';
import { connect } from 'react-redux';

import { PropTypes } from 'prop-types';

import { fetchPosts } from '../../redux/actions/posts';

import Posts from '../../components/Posts';
import ApiCallLib from '../../libs/apiCallLib';

const mapStateToProps = ({ posts }) => ({
  posts,
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: (posts) => {
    dispatch(fetchPosts(posts));
  },
});

class Home extends React.Component {
  constructor() {
    super();
    this.api = new ApiCallLib();
  }
  componentWillMount() {
    this.api.get('/posts')
      .then((response) => {
        this.props.fetchPosts(response.data);
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
        <Posts posts={this.props.posts} />
      </div>
    );
  }
}

Home.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.any).isRequired,
  fetchPosts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { PropTypes } from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import { fetchPosts } from '../../redux/actions/posts';

import Posts from '../../components/Posts';
import api from '../../libs/apiCallLib';

const mapStateToProps = ({ posts, authentication }) => ({
  posts,
  authentication: authentication.get('token'),
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: (posts) => {
    dispatch(fetchPosts(posts));
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    api.get('/posts')
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
        <div className="headers">
          {
            this.props.authentication ?
              <Link to="/new">
                <RaisedButton label="Create a new post" primary onClick={() => { }} />
              </Link>
              :
              <RaisedButton disabled label="Log in to post" primary />
          }
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
  authentication: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import api from '../../libs/apiCallLib';

import { fetchPosts } from '../../redux/actions/posts';
import { fetchComments } from '../../redux/actions/comments';

import socketHelper from '../../modules/socket';

import Comments from '../../components/Comments';

const mapDispatchToProps = dispatch => ({
  fetchPosts: (posts) => {
    dispatch(fetchPosts(posts));
  },
  fetchComments: (comments) => {
    dispatch(fetchComments(comments));
  },
});

class PostDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null,
    };
  }

  componentWillMount() {
    if (this.props.posts && this.props.posts.length) {
      this.setState({
        post: this.props.posts.find(post => post.id.toString() === this.props.match.params.id),
      });
    } else {
      api.get(`/post/${this.props.match.params.id}`)
        .then((response) => {
          this.setState({
            post: response.data,
          });
        });
    }

    setTimeout(() => {
      socketHelper.sendEvent({
        'x-method': 'get',
        'x-post-id': this.props.match.params.id,
      });
    }, 2000);
  }

  componentReceiveProps(nextProps) {
    this.setState({
      post: nextProps.posts.find(post => post.id.toString() === nextProps.match.params.id),
    });
  }

  render() {
    const { post } = this.state;

    if (!post) {
      return (<div />);
    }
    return (
      <div>
        <div>
          <Card >
            <CardTitle
              title={post.title}
              subtitle={post.description}
            />
            <CardText>
              {post.content}
            </CardText>
          </Card>
          <Card >
            <CardTitle
              title="Comments"
              titleColor="rgba(0, 0, 0, 0.54)"
            />
            <CardText>
              <Comments comments={this.props.comments} />
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, comments }) => ({
  posts,
  comments,
});

PostDetail.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.any).isRequired,
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);

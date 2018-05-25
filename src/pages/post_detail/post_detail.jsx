import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
//import './post_detail.css';
import { api } from '../../libs/api';

import { fetchPosts } from '../../redux/actions/posts';

const mapDispatchToProps = dispatch => ({
  fetchPosts: (posts) => {
    dispatch(fetchPosts(posts));
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
    console.log(this.props)
    if (this.props.posts && this.props.posts.length) { // On à les post dans le store
      this.setState({
        post: this.props.posts.find(post => post.id.toString() === this.props.match.params.id),
      });
    } else { // On fetch le post
      api.get(`/post/${this.props.match.params.id}`)
        .then((response) => {
          this.setState({
            post: response.data,
          });
        });
    }
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
              commentaires
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  posts,
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

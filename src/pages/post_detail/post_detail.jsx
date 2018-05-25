import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import ChatWindow from '../../components/ChatWindow';
import { connect } from 'react-redux';
import { api } from '../../libs/api';

import { fetchPosts } from '../../redux/actions/posts';

const mapStateToProps = ({ posts }) => ({
  posts,
});

const mapDispatchToProps = dispatch => ({
  fetchPosts: (posts) => {
    dispatch(fetchPosts(posts));
  },
});

class PostDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    if (this.props.post && this.props.post.length) { // On à les post dans le store
      this.setState = ({
        post: this.props.posts.find((post) => { return post.id.toString() === this.props.match.params.id })
      });
    } else { // On fetch le post
      api.get('/post/' + this.props.match.params.id)
        .then((response) => {
          console.log(response);

          this.setState({
            post: response.data,
          })
        })
    }
  }

  componentReceiveProps(nextProps) {
    this.setState({
      post: nextProps.posts.find((post) => { return post.id.toString() === nextProps.match.params.id }),
    });
  }

  render() {
    const post = this.state.post;

    if (!post) {
      return (<div />);
    }
    console.log(post)
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

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);

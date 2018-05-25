import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import logo from '../../logo.svg';
import './post_detail.css';
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
    return (
      <div>
        <div>
          <Card >
            <CardTitle
              title={post.name}
              subtitle={post.description}
            />
            <CardText>
              {post.content}
            </CardText>
          </Card>
          <Card >
            <CardTitle
              title="Ici on va mettre les commentaires"
              subtitle="commentaires"
            />
            <CardText>
              commentaires
              commentaires
              commentaires
              commentaires
              commentaires
              commentaires
              commentaires
            </CardText>
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);

import React, { Component } from 'react';
import { Card, CardTitle, CardText, Toolbar, ToolbarGroup, FlatButton, FontIcon } from 'material-ui';
import PropTypes from 'prop-types';
import './post.css';
import Comments from '../../components/Comments';

class Post extends Component {
  componentWillMount() {}
  render() {
    const post = {
      name: 'Blabla',
      description: 'dsflkjsfjdklflsklfksdf',
      content: 'sfhsjfkskadhfklshdkljfhljskdhkljdshjklshkljfhjkldshjklhfjkldshjklfhlkhdjklfhslkshflhlkshdlkfh',
    };
    return (
      <div>
        <Toolbar className="toolbar">
          <ToolbarGroup firstChild>
            <FlatButton
              icon={
                <FontIcon className="material-icons">keyboard_backspace</FontIcon>
              }
              onClick={() => { this.props.history.goBack(); }}
            />
          </ToolbarGroup>
        </Toolbar>
        <Card>
          <CardTitle
            title={post.name}
            subtitle={post.description}
          />
          <CardText>
            {post.content}
          </CardText>
        </Card>
        <Card>
          <CardTitle
            title="Ici on va mettre les commentaires"
            subtitle="commentaires"
          />
          <CardText>
            <Comments />
          </CardText>
        </Card>
      </div>
    );
  }
}

Post.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Post;

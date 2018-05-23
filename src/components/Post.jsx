import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* MATERIAL-UI */
import {
  Card,
  CardText,
  CardTitle,
} from 'material-ui';

function Post({ post }) {
  return (
    <Card>
      <CardTitle>
        <Link to={`/posts/${post.id}`}>
          <h3>{post.title}</h3>
          <h5>{post.description}</h5>
        </Link>
      </CardTitle>
      <CardText>
        <p>
          {post.content}
        </p>
        <span className="comments-number">
          {post.comments} comments
        </span>
      </CardText>
    </Card>
  );
}

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Post;

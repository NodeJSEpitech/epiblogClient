import React from 'react';
import { Card, CardText, CardHeader } from 'material-ui';
import PropTypes from 'prop-types';

function Comment({ comment }) {
  return (
    <Card>
      <CardHeader
        title={comment.username}
        avatar={comment.avatar}
      />
      <CardText>
        { comment.content }
      </CardText>
    </Card>
  );
}

Comment.propTypes = {
  comment: PropTypes.objectOf({
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;

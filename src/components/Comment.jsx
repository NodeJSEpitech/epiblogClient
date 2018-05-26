import React from 'react';
import { Card, CardText, CardHeader } from 'material-ui';

function Comment({ comment }) {
  console.log({ comment });
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

export default Comment;

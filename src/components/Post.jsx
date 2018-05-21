import React from 'react';
import PropTypes from 'prop-types';

/* MATERIAL-UI */
import {
  Card,
  CardText,
  CardTitle,
} from 'material-ui';

function Post({ post: { title, description, content } }) {
  return (
    <Card>
      <CardTitle
        title={title}
        subtitle={description}
      />
      <CardText>
        {content}
      </CardText>
    </Card>
  );
}

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Post;

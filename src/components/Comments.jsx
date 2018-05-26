import React from 'react';

import { Card, CardText } from 'material-ui';
import PropTypes from 'prop-types';

import Comment from './Comment';
import CommentWriter from './CommentWriter';

class Comments extends React.Component {
  componentWillMount() {
  }
  render() {
    return (
      <div className="comments">
        <Card>
          <CommentWriter
            handleChange={this.props.handleChange}
            sendComment={this.props.sendComment}
          />
          <CardText>
            { this.props.comments.map(comment => (
              <div key={`comment_${comment.id}`}>
                <Comment comment={comment} />
              </div>
            )) }
          </CardText>
        </Card>
      </div>
    );
  }
}

Comments.propTypes = {
  handleChange: PropTypes.func.isRequired,
  sendComment: PropTypes.func.isRequired,
  comments: PropTypes.ObjectOf(PropTypes.any).isRequired,
};

export default Comments;

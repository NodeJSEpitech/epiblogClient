import React from 'react';

import { Card } from 'material-ui';

import Comment from './Comment';

class Comments extends React.Component {
  componentWillMount() {
  }
  render() {
    return (
      <div className="comments">
        <Card>
          { this.props.comments.map(comment => (
            <div key={`comment_${comment.id}`}>
              <Comment comment={comment} />
            </div>
          )) }
        </Card>
      </div>
    );
  }
}

export default Comments;

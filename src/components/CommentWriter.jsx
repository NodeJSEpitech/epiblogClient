import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardText, TextField, RaisedButton, CardActions } from 'material-ui';

function CommentWriter(props) {
  return (
    <Card>
      <CardText>
        <TextField
          hintText="Message Field"
          floatingLabelText="Type your comment here"
          multiLine
          fullWidth
          onChange={props.handleChange}
        />
      </CardText>
      <CardActions style={{ textAlign: 'right' }}>
        <RaisedButton label="Post a comment" primary onClick={() => { props.sendComment(); }} />
      </CardActions>
    </Card>
  );
}

CommentWriter.propTypes = {
  handleChange: PropTypes.func.isRequired,
  sendComment: PropTypes.func.isRequired,
};

export default CommentWriter;

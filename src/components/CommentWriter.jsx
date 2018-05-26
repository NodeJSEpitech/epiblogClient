import React from 'react';

import { Card, CardText, TextField, RaisedButton, CardActions } from 'material-ui';

function CommentWriter(props) {
  return (
    <Card>
      <CardText>
        <TextField
          hintText="Message Field"
          floatingLabelText="MultiLine and FloatingLabel"
          multiLine={true}
          fullWidth
          onChange={ props.handleChange }
        />
      </CardText>
      <CardActions style={ { textAlign: "right" } }>
        <RaisedButton label="Post a comment" primary={true} onClick={ () => { props.sendComment(); } } />
      </CardActions>
    </Card>
  );
}

export default CommentWriter;

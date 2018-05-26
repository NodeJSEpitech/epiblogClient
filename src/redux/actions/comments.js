import { FETCH_COMMENTS } from '../actionTypes';

const fetchComments = comments => ({
  type: FETCH_COMMENTS,
  payload: comments,
});

export default fetchComments;

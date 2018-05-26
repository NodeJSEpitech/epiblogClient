import { FETCH_COMMENTS } from '../actionTypes';

export const fetchComments = comments => ({
  type: FETCH_COMMENTS,
  payload: comments,
});

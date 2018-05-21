import React from 'react';
import PropTypes from 'prop-types';

/* COMPONENTS */
import Post from './Post';

/* MATERIAL-UI */

function Posts({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <p>There is no posts yet</p>
    );
  }

  return (
    <div>
      {posts.map(post => (
        <div key={`post_${post.id}`} className="post">
          <Post post={post} />
        </div>
        ))}
    </div>
  );
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Posts;

import React from 'react';
import PostContainer from '../containers/PostContainer';

function PostListPage({ match }) {
  const { id } = match.params;
  const postId = parseInt(id, 10);

  return (
    <div>
      <PostContainer postId={postId} />;
    </div>
  );
}

export default PostListPage;
'use client';

import { useState } from 'react';
import { getLocaleDate } from '../lib/utils';
import { type Post as PostType } from '../types';
import PostForm from './PostForm';

type Props = {
  post: PostType;
};

export default function Post({ post }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  function CommentMeta() {
    return (
      <div className='mb-2'>
        <p className='font-bold'>{post.user}</p>
        <p className='text-gray-500'>
          Commented on{' '}
          <span className='text-gray-500'>
            {getLocaleDate(post.last_update)}
          </span>
        </p>
      </div>
    );
  }
  return (
    <div className='text-sm text-gray-700 p-4 border rounded-md border-gray-200'>
      {isEditing ? (
        <>
          <CommentMeta />
          <PostForm
            iso={post.country}
            product={post.product}
            post={post}
            isEditing
            onCancel={() => setIsEditing(false)}
          />
        </>
      ) : (
        <div className='flex gap-2 justify-between items-center'>
          <div>
            <CommentMeta />
            <p>Score: {post.score}</p>
            <p className='mt-2'>{post.comment ? post.comment : null}</p>
          </div>
          <div className='flex gap-2'>
            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
}

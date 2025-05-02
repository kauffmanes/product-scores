import { type Post as PostType } from '../types';

type Props = {
  post: PostType;
};

export default function Post({ post }: Props) {
  return (
    <div className='text-sm text-gray-700 p-4 border rounded-md border-gray-200'>
      <p className='font-bold'>{post.user}</p>
      <p className='text-gray-500'>
        Commented on <span className='text-gray-500'>{getPostDate(post)}</span>
      </p>
      <p>Score: {post.score}</p>
      <p className='mt-2'>{post.comment ? <p>{post.comment}</p> : null}</p>
    </div>
  );
}

function getPostDate(post: PostType) {
  const date = new Date(post.last_update);
  return date.toLocaleDateString();
}

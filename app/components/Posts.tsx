import { Suspense } from 'react';
import { Product } from '../types';
import Post from './Post';
import PostForm from './PostForm';
import { fetchPosts } from '../lib/posts';

type Props = {
  product: Product;
  iso: string | undefined;
  country: string | undefined;
  score?: number | undefined;
};

export default async function Posts({ product, iso, country, score }: Props) {
  if (!iso) {
    return (
      <p className='m-2 ext-gray-500 text-center p-6 bg-gray-100 rounded-md'>
        Select a country to get started.
      </p>
    );
  }

  const { status, message, posts } = await fetchPosts(iso, product);

  function renderPosts() {
    if (posts.length === 0) {
      return (
        <p className='text-gray-500 text-center p-6 bg-gray-100 rounded-md'>
          No posts found
        </p>
      );
    }

    return posts.map((post) => <Post key={post.id} post={post} />);
  }

  return (
    <div className='p-4 overflow-y-auto flex flex-col gap-6'>
      {status === 'success' ? (
        <>
          <div className='flex gap-2'>
            <p className='flex-1 '>
              <strong>Country: </strong>
              <br />
              {country} ({iso})
            </p>
            <p className='flex-1 '>
              <strong>Overall score: </strong>
              <br />
              {score !== undefined ? score.toFixed(1) : 'N/A'}
            </p>
          </div>
          <PostForm iso={iso} product={product} />
          <Suspense fallback={<div>Loading posts...</div>}>
            <div className='flex flex-col gap-2'>{renderPosts()}</div>
          </Suspense>
        </>
      ) : (
        <p className='text-red-500'>Error: {message}</p>
      )}
    </div>
  );
}

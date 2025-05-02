import { Product } from '../types';
import Post from './Post';
import CreatePost from './CreatePost';
import { fetchPosts } from '../lib/posts';

type Props = {
  product: Product;
  iso: string | undefined;
  country: string | undefined;
  score?: number | undefined;
};

export default async function Posts({ product, iso, country, score }: Props) {
  if (!iso) return null;

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
              {score ?? 'N/A'}
            </p>
          </div>
          <CreatePost />
          <div>{renderPosts()}</div>
        </>
      ) : (
        <p className='text-red-500'>Error: {message}</p>
      )}
    </div>
  );
}

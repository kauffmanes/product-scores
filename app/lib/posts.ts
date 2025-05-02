import { Post, Product } from '../types';

const fastApiUrl = process.env.FAST_API_URL;
const fastApiKey = process.env.FAST_API_KEY;

type FetchResponse =
  | {
      status: 'success';
      message: string;
      posts: Post[];
    }
  | {
      status: 'failed';
      message: string;
      posts: never;
    };

export async function fetchPosts(
  iso: string,
  product: Product
): Promise<FetchResponse> {
  if (!fastApiUrl || !fastApiKey) {
    throw new Error('FAST_API_URL and FAST_API_KEY must be set');
  }

  if (!iso || !product) {
    throw new Error('Both `iso` and `product` are required parameters');
  }

  const url = new URL(`${fastApiUrl}/posts`);
  url.searchParams.set('country', iso);
  url.searchParams.set('product', product);

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'X-API-Key': fastApiKey,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  return data;
}

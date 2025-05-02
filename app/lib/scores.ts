const fastApiUrl = process.env.FAST_API_URL;
const fastApiKey = process.env.FAST_API_KEY;

export async function fetchScores(product: string, iso?: string) {
  if (!fastApiUrl || !fastApiKey) {
    throw new Error('FAST_API_URL and FAST_API_KEY must be set');
  }

  if (!product) {
    throw new Error('Product is required');
  }

  const url = new URL(`${fastApiUrl}/scores`);
  url.searchParams.set('product', product);

  if (iso) {
    url.searchParams.set('iso', iso);
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'X-API-Key': fastApiKey,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch scores');
  }

  const data = await response.json();
  return data;
}

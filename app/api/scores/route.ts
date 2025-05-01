import { NextResponse } from 'next/server';

const fastApiUrl = process.env.FAST_API_URL;
const fastApiKey = process.env.FAST_API_KEY;

export async function GET(request: Request) {
  if (!fastApiUrl || !fastApiKey) {
    throw new Error('FAST_API_URL and FAST_API_KEY must be set');
  }

  const { searchParams } = new URL(request.url);
  const product = searchParams.get('product');

  if (!product) {
    return NextResponse.json({ error: 'Product is required' }, { status: 400 });
  }

  const response = await fetch(`${fastApiUrl}/scores?product=${product}`, {
    method: 'GET',
    headers: {
      'X-API-Key': fastApiKey,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch scores' },
      { status: 500 }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}

import { redirect } from 'next/navigation';

import Map from '@/app/components/Map';
import MapLegend from '@/app/components/MapLegend';
import ProductSelector from '@/app/components/ProductSelector';
import Logo from '@/app/components/Logo';
import Posts from '@/app/components/Posts';
import { Product } from './types';
import { fetchScores } from './lib/scores';

export default async function Home({
  searchParams
}: {
  searchParams: Promise<{
    product?: Product;
    iso?: string;
    country?: string;
  }>;
}) {
  const params = await searchParams;
  const product = params.product;
  const iso = params.iso;
  const country = params.country;

  // If no product is specified, redirect with default product
  if (!product) {
    const params = new URLSearchParams();
    params.set('product', Product.LandCoverFL);
    redirect(`/?${params.toString()}`);
  }

  const { scores } = await fetchScores(product);

  const activeCountryScore = iso ? scores?.[iso] : undefined;

  return (
    <div className='w-full h-full flex flex-col'>
      <header className='h-16 border-b border-gray-200  p-4 sm:flex items-center gap-4 fixed top-0 left-0 right-0 bg-background box-shadow-lg'>
        <Logo />
      </header>
      <main className='flex-1 mt-16 relative bg-gray-500'>
        <div className='absolute top-0 left-0 bottom-0 sm:bottom-4 sm:left-4 sm:top-4 sm:rounded-sm bg-white box-shadow-lg w-full sm:w-96 z-10 flex flex-col gap-2'>
          <ProductSelector product={product} />
          <hr className='border-gray-200' />
          <Posts
            product={product}
            iso={iso}
            country={country}
            score={activeCountryScore}
          />
        </div>
        <Map
          center={[-79.9972, 40.4387]}
          zoom={3}
          product={product}
          scores={scores}
          iso={iso}
        />
        <MapLegend />
      </main>
    </div>
  );
}

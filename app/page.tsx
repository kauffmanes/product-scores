'use client';

import { useEffect, useState } from 'react';

import { useSearchParams, useRouter } from 'next/navigation';

import Map from '@/app/components/Map';
import MapLegend from '@/app/components/MapLegend';
import { Products } from '@/app/constants';
import ProductSelector from './components/ProductSelector';
import Logo from './components/Logo';

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialProduct =
    (searchParams.get('product') as Products) || Products.LandCoverFL;

  const [product, setProduct] = useState<Products>(initialProduct);

  // Update URL when product changes
  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('product', product);
    router.replace(`?${params.toString()}`);
  }, [router, product, searchParams]);

  return (
    <div className='w-full h-full flex flex-col'>
      <header className='h-16 border-b border-gray-200  p-4 sm:flex items-center gap-4 fixed top-0 left-0 right-0 bg-background box-shadow-lg'>
        <Logo />
      </header>
      <main className='flex-1 mt-16 relative bg-gray-500'>
        <div className='absolute top-0 left-0 sm:left-4 sm:top-4 sm:rounded-sm bg-white box-shadow-lg p-4 w-full sm:w-72 z-10 flex flex-col gap-8'>
          <ProductSelector product={product} setProduct={setProduct} />
          <MapLegend />
        </div>
        <Map center={[-79.9972, 40.4387]} zoom={3} product={product} />
      </main>
    </div>
  );
}

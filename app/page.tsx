'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';

import Map from '@/app/components/Map';
import MapLegend from '@/app/components/MapLegend';
import { Products, productNames } from '@/app/constants';

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
      <header className='h-20 p-4 flex items-center gap-4 fixed top-0 left-0 right-0 bg-background box-shadow-lg'>
        <Image
          src='/earthshot-dark.webp'
          alt='Earthshot Logo'
          width={150}
          height={75}
          priority
        />
        <span className='text-lg'>Product Scores</span>
        <div className='ml-auto'>
          <label className='block text-sm font-medium text-gray-700'>
            Select product:
            <select
              className='mt-1 block w-full border border-gray-300 rounded'
              value={product}
              onChange={(e) => setProduct(e.target.value as Products)}
            >
              {Object.values(Products).map((code) => (
                <option key={code} value={code}>
                  {productNames[code]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>
      <main className='flex-1 mt-20 h-full relative'>
        <Map center={[-79.9972, 40.4387]} zoom={3} product={product} />
        <MapLegend />
      </main>
    </div>
  );
}

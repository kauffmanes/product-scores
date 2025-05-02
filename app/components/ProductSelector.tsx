'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { productNames } from '@/app/constants';
import { Product } from '@/app/types';

type Props = {
  product: Product;
};

export default function ProductSelector({ product }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newProduct = e.target.value as Product;
    const params = new URLSearchParams(Array.from(searchParams.entries()));

    params.set('product', newProduct);
    router.replace(`${window.location.pathname}?${params.toString()}`);
  }

  return (
    <div className='p-4'>
      <label className='block text-md font-medium text-gray-700'>
        <span className='text-sm font-bold text-gray-700'>Product</span>
        <select
          className='mt-1 p-2 block w-full border border-gray-300 rounded'
          value={product}
          onChange={onChange}
        >
          {Object.values(Product).map((code) => (
            <option key={code} value={code}>
              {productNames[code]}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

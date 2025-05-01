import { Products, productNames } from '@/app/constants';

type Props = {
  product: Products;
  setProduct: (product: Products) => void;
};

export default function ProductSelector({ product, setProduct }: Props) {
  return (
    <div className=''>
      <label className='block text-md font-medium text-gray-700'>
        <span className='text-sm font-bold text-gray-700'>Product</span>
        <select
          className='mt-1 p-2 block w-full border border-gray-300 rounded'
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
  );
}

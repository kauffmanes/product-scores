type Props = {
  country: string;
  iso: string;
  score: number | 'N/A';
};

export default function MapPopup({ country, iso, score }: Props) {
  return (
    <div className='text-base bg-white text-gray-800 w-full flex flex-col gap-2'>
      <div className='font-bold leading-tight'>
        {country} <span className='text-gray-500'>({iso})</span>
      </div>
      <div className='mt-1'>
        <span className='font-medium'>Score:</span>{' '}
        <span className='text-green-600'>{score ?? 'N/A'}</span>
      </div>
    </div>
  );
}

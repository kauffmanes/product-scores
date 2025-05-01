export default function MapLegend() {
  return (
    <div className='absolute bottom-4 right-4 z-10 bg-white rounded shadow-md p-4 w-64'>
      <div className='text-sm font-semibold mb-2'>Score Legend</div>
      <div className='relative h-4 rounded overflow-hidden bg-gray-200'>
        <div
          className='absolute inset-0'
          style={{
            background:
              'linear-gradient(to right, hsl(0, 100%, 50%), hsl(60, 100%, 50%), hsl(120, 100%, 50%))'
          }}
        />
      </div>
      <div className='flex justify-between text-xs mt-1 text-gray-700'>
        <span>0</span>
        <span>50</span>
        <span>100</span>
      </div>
    </div>
  );
}

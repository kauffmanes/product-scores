import Image from 'next/image';
import Map from '@/app/components/Map';

export default function Home() {
  return (
    <div className='w-full h-full flex flex-col'>
      <header className='h-20 p-4 flex items-center gap-4 fixed top-0 left-0 right-0 bg-background box-shadow-lg'>
        <Image
          className='dark:invert'
          src='/earthshot-dark.webp'
          alt='Earthshot Logo'
          width={150}
          height={75}
        />
        <span className='text-lg'>Product Scores</span>
      </header>
      <main className='flex-1 mt-20 h-full'>
        <Map center={[-79.9972, 40.4387]} zoom={3} />
      </main>
    </div>
  );
}

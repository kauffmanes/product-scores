import Image from 'next/image';

export default function Logo() {
  return (
    <div className='h-full flex items-center gap-2'>
      <Image
        src='/earthshot-dark.webp'
        alt='Earthshot Logo'
        width={150}
        height={75}
        priority
        className='hidden sm:block'
      />
      <Image
        src='/earthshot-dark-icon.png'
        alt='Earthshot Logo'
        width={40}
        height={40}
        priority
        className='block sm:hidden'
      />
      <span className='text-xl font-semibold'>Product Scores</span>
    </div>
  );
}

'use client';

import { useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function CollapsiblePanel({ children }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`
        absolute top-0 left-0 bottom-0 sm:bottom-4 sm:left-4 sm:top-4 sm:rounded-sm
        bg-white box-shadow-lg w-full sm:w-96 z-10 flex flex-col gap-2
        transition-all duration-300
        ${open ? 'h-3/4' : 'h-10'}
        sm:h-auto
      `}
    >
      <button
        className='sm:hidden w-full p-2 text-gray-700 border-b border-gray-200'
        onClick={() => setOpen((v) => !v)}
      >
        <div className='flex items-center justify-between'>
          <span>{open ? 'Close' : 'Show details'}</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              open ? 'rotate-180' : ''
            }`}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </div>
      </button>
      <div
        className={`overflow-y-auto flex-1 ${
          open || typeof window === 'undefined' ? '' : 'hidden'
        } sm:block`}
      >
        {children}
      </div>
    </div>
  );
}

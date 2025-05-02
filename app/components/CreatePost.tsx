'use client';

import { useActionState } from 'react';
import Form from 'next/form';
import { createPost, ActionResponse } from '../actions/posts';
import { Product } from '../types';
import { useRouter } from 'next/navigation';
import { cn } from '../lib/utils';

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: undefined
};

export default function CreatePost({
  iso,
  product
}: {
  iso: string;
  product: Product;
}) {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (_: ActionResponse, formData: FormData) => {
    const score = formData.get('score');

    const data = {
      country: iso,
      product,
      score: score ? Number(score) : 50,
      comment: formData.get('comment') as string
    };

    try {
      const result = await createPost(data);

      if (result.success) {
        router.refresh();
      }

      return result;
    } catch (err) {
      return {
        success: false,
        message: (err as Error).message || 'An error occurred',
        errors: undefined
      };
    }
  }, initialState);

  return (
    <div className='text-sm'>
      <Form className='flex flex-col gap-2 items-end' action={formAction}>
        <div className='w-full'>
          <input
            name='score'
            type='number'
            placeholder='Score'
            min={0}
            max={100}
            required
            step={1}
            className={cn(
              'w-full border rounded-md p-2',
              state?.errors?.score ? 'border-red-500' : ''
            )}
          />
          {state?.errors?.score ? (
            <p id='score-error' className='text-red-500'>
              {state.errors.score.join(', ')}
            </p>
          ) : null}
        </div>
        <div className='w-full'>
          <textarea
            aria-label='Comment'
            name='comment'
            placeholder='Leave a comment'
            aria-describedby='comment-error'
            disabled={isPending}
            minLength={3}
            maxLength={300}
            className={cn(
              'w-full border rounded-md p-2',
              state?.errors?.comment ? 'border-red-500' : ''
            )}
          />
          {state?.errors?.comment ? (
            <p id='comment-error' className='text-red-500'>
              {state.errors.comment.join(', ')}
            </p>
          ) : null}
        </div>
        <button
          type='submit'
          className='bg-gray-700 text-white p-1 px-2 rounded-sm'
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'Create'}
        </button>
      </Form>
    </div>
  );
}

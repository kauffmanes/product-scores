'use client';

import { useActionState } from 'react';
import Form from 'next/form';
import { createPost, updatePost, ActionResponse } from '../actions/posts';
import { Post, Product } from '../types';
import { useRouter } from 'next/navigation';
import { cn } from '../lib/utils';

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: undefined
};

type Props =
  | {
      iso: string;
      product: Product;
      post?: never;
      isEditing?: false;
      closeForm?: never;
    }
  | {
      iso: string;
      product: Product;
      post: Post;
      isEditing: true;
      closeForm: () => void;
    };

export default function PostForm({
  iso,
  product,
  post,
  isEditing,
  closeForm
}: Props) {
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
      const result = isEditing
        ? await updatePost(post.id, data)
        : await createPost(data);

      if (result.success) {
        router.refresh();
        closeForm?.();
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
            defaultValue={post?.score}
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
            defaultValue={post?.comment || ''}
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
        <div className='flex gap-2'>
          {isEditing ? (
            <button
              type='button'
              className='border border-gray-300 rounded-md p-1 px-2'
              disabled={isPending}
              onClick={closeForm}
            >
              Cancel
            </button>
          ) : null}
          <button
            type='submit'
            disabled={isPending}
            className='bg-gray-700 text-white p-1 px-2 rounded-sm'
          >
            {isPending ? 'Saving...' : isEditing ? 'Update' : 'Create'}
          </button>
        </div>
      </Form>
    </div>
  );
}

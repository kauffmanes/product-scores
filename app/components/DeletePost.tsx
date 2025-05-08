'use client';

import { useTransition } from 'react';
import { Post } from '../types';
import { deletePost } from '../actions/posts';
import { useRouter } from 'next/navigation';

export default function DeletePost({ post }: { post: Post }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleDelete() {
    startTransition(async () => {
      try {
        const result = await deletePost(post.id);

        if (!result.success) {
          throw new Error(result.error || 'Failed to delete issue');
        }

        router.refresh();
      } catch (error) {
        console.error(error);
      }
    });
  }

  function confirmDelete() {
    const confirm = prompt('Are you sure you want to delete this post? Y/n');
    if (confirm === 'yes' || confirm === 'y') {
      handleDelete();
    }
  }

  return (
    <button
      className='text-red-500 hover:text-red-600 px-2 py-1'
      onClick={confirmDelete}
      disabled={isPending}
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}

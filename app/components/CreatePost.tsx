import Form from 'next/form';

export default function CreatePost() {
  return (
    <div className='text-sm'>
      <Form className='flex flex-col gap-2 items-end' action='/api/posts'>
        <textarea
          name='comment'
          placeholder='Leave a comment'
          className='w-full border rounded-md p-2 '
        />
        <button
          type='submit'
          className='bg-gray-700 text-white p-1 px-2 rounded-sm'
        >
          Create
        </button>
      </Form>
    </div>
  );
}

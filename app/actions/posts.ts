export async function createPost(formData: FormData) {
  const comment = formData.get('comment');
  const country = formData.get('country');
  const product = formData.get('product');

  console.log(comment, country, product);
}

'use server';

import { z } from 'zod';

const fastApiUrl = process.env.FAST_API_URL;
const fastApiKey = process.env.FAST_API_KEY;

// Validation of form data
const PostSchema = z.object({
  country: z.string().min(1),
  product: z.string().min(1),
  score: z
    .number()
    .min(0, 'Score must be 0 or higher')
    .max(100, 'Score must be 100 or lower'),
  comment: z.string().optional()
});

type PostData = z.infer<typeof PostSchema>;

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
  error?: string;
};

export async function createPost(data: PostData): Promise<ActionResponse> {
  try {
    if (!fastApiUrl || !fastApiKey) {
      throw new Error('FAST_API_URL and FAST_API_KEY must be set');
    }

    const validationResult = PostSchema.safeParse(data);

    console.log('data from within the action', data);

    if (!validationResult.success) {
      return {
        success: false,
        message: 'Validation failed',
        errors: validationResult.error.flatten().fieldErrors
      };
    }

    const validatedData = validationResult.data;

    await fetch(`${fastApiUrl}/posts`, {
      method: 'POST',
      headers: {
        'X-API-Key': fastApiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(validatedData)
    });

    return { success: true, message: 'Post created successfully' };
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred',
      error: (error as Error).message
    };
  }
}

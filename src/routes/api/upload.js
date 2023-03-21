import { createDirectUploadSignature } from '$lib/cloudflare';

export async function post(request) {
  const user = request.locals.user;

  if (!user) {
    return {
      status: 401,
      body: { error: 'Unauthorized' }
    };
  }

  const signature = await createDirectUploadSignature();

  return {
    status: 200,
    body: signature
  };
}
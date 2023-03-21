import fetch from 'node-fetch';

export async function createDirectUploadSignature() {
  const response = await fetch('https://api.cloudflare.com/client/v4/accounts/:account_id/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Key': process.env.CLOUDFLARE_KEY,
      'X-Auth-Email': process.env.CLOUDFLARE_EMAIL
      },
    body: JSON.stringify({
      'direct_user': true
      })
    });
      
    const result = await response.json();
      
    if (!result.success) {
      throw new Error('Failed to create Cloudflare direct upload signature');
    }
      
    return result.result;
}
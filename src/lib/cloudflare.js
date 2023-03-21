import fetch from 'node-fetch';

export async function createDirectUploadSignature() {
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
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
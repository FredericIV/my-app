import fetch from 'node-fetch';
import {CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN} from '$env/static/private';

export async function createDirectUploadSignature() {
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${CLOUDFLARE_API_TOKEN}`,
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
import { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN } from '$env/static/private';
export async function POST(request) {
	const endpoint = `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream?direct_user=true`;
	const response = await fetch(endpoint, {
		method: 'POST',
		headers: {
			'Authorization': `bearer ${CLOUDFLARE_API_TOKEN}`,
			'Tus-Resumable': '1.0.0',
			'Upload-Length': request.request.headers.get('Upload-Length'),
			'Upload-Metadata': request.request.headers.get('Upload-Metadata'),
		},
	});
	
	const destination = await response.headers.get('Location');
	console.log(response.headers);
	return new Response(null, {
		headers: {
			'Access-Control-Expose-Headers': 'Location',
			'Access-Control-Allow-Headers': '*',
			'Access-Control-Allow-Origin': '*',
			'Location': destination,
		},
	});
}
export async function GET() {
	return new Response(null, {
		status: 405,
	});
}
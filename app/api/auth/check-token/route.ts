import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token');

    if (!token) {
      return new Response(JSON.stringify({ error: 'No token found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ token }), { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response(JSON.stringify({ error: 'An error occurred while fetching the token' }), { status: 500 });
  }
}

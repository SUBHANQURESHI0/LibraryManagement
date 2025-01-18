// In your login route (POST /api/auth/login)
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

const SECRET = process.env.JWT_SECRET || 'secret123';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), {
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, {
      expiresIn: '1h',
    });

    // Set the token in the cookie
    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true, // Important for security
      secure: process.env.NODE_ENV === 'production', // true in production
      path: '/', // Ensure cookie is accessible on all routes
      sameSite: 'strict', // Prevent CSRF
    });

    return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 });
  } catch (error) {
    console.error('Error during login request:', error);
    return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), { status: 500 });
  }
}

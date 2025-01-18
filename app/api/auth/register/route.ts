import bcrypt from 'bcryptjs';
import {prisma} from '@/lib/prisma';

export async function POST(req: Request) {
  const { email, password, role } = await req.json();
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword, role },
  });

  return new Response(JSON.stringify({ success: true, user }), { status: 201 });
}

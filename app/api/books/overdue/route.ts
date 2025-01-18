import {prisma} from '@/lib/prisma';

export async function GET() {
  const overdueBooks = await prisma.book.findMany({
    where: {
      dueDate: { lte: new Date() },
      issuedById: { not: null },
    },
    include: { issuedBy: true },
  });

  return new Response(JSON.stringify(overdueBooks), { status: 200 });
}

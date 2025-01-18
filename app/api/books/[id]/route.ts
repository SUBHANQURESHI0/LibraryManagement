import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params; // Awaiting params before accessing id

  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!book) {
      return new Response(JSON.stringify({ error: 'Book not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(book), { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error fetching book details' }),
      { status: 500 }
    );
  }
}

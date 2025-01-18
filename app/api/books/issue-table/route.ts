import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const issuedBooks = await prisma.book.findMany({
      where: { issuedById: { not: null } },
      include: {
        issuedBy: {
          select: {
            email: true,
            id: true,
          },
        },
      },
    });

    return NextResponse.json(issuedBooks, { status: 200 });
  } catch (error) {
    console.error("Error fetching issued books:", error);
    return NextResponse.json({ error: "Failed to fetch issued books" }, { status: 500 });
  }
}

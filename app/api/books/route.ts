import { v2 as cloudinary } from 'cloudinary';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function GET() {
  const books = await prisma.book.findMany({
    include: { issuedBy: true },
  });
  return NextResponse.json(books);
}


export async function POST(req: Request) {
  const { title, author, pictureBase64 } = await req.json();
  const uploadedImage = await cloudinary.uploader.upload(pictureBase64, {
    folder: 'library/books',
  });

  const book = await prisma.book.create({
    data: {
      title,
      author,
      picture: uploadedImage.secure_url,
    },
  });

  return NextResponse.json(book, { status: 201 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.book.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

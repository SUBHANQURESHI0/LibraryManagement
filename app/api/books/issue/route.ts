import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { email, bookId } = await req.json();

  // Find the book by ID
  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book || book.issuedById) {
    return new Response(
      JSON.stringify({ error: 'Book is already issued or does not exist' }),
      { status: 400 }
    );
  }

  // Get the current date and calculate the due date (14 days from today)
  const issuedDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(issuedDate.getDate() + 14);

  // Find the user by email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return new Response(
      JSON.stringify({ error: 'User not found' }),
      { status: 404 }
    );
  }

  // Update the book's issuedById and issue date
  await prisma.book.update({
    where: { id: bookId },
    data: { issuedById: user.id, issuedDate, dueDate },
  });

  // Send an email notification to the user
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Book Issued: ${book.title}`,
    text: `You have issued "${book.title}". Please return it by ${dueDate.toDateString()}.`,
  });

  // Return success response
  return new Response(
    JSON.stringify({ success: true, message: 'Book issued successfully' }),
    { status: 200 }
  );
}

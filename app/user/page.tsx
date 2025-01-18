"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
  picture: string;
  createdAt: string;
  issuedById?: number | null;
  issuedDate?: string | null;
  dueDate?: string | null;
};

export default function UserDashboard() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white flex flex-col items-center py-16 px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">User Dashboard</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Available Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book) =>
          !book.issuedById ? (
            <div
              key={book.id}
              className="bg-white p-4 rounded-xl shadow-xl hover:scale-105 transform transition-all"
            >
              <Image
                src={book.picture}
                alt={`${book.title} cover`}
                width={150}
                height={200}
                className="mb-4 px-4 flex items-center rounded-lg object-cover"
              />
              <div className="p-3">
                <h3 className="text-xl  text-gray-700 font-semibold">{book.title}</h3>
              <p className="text-md text-gray-700">{book.author}</p>
              </div>
              <Link
                href={`/issue-book?bookId=${book.id}`}
                className="mt-4 px-6 py-2 bg-teal-500 text-white text-lg font-semibold rounded-full transition-all transform hover:scale-105 hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300"
              >
                Issue Book
              </Link>
            </div>
          ) : null
        )}
      </div>
    </div></>
  );
}

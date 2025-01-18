"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
  picture: string;
};

export default function IssueBookPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookId = searchParams.get("bookId");
  const [book, setBook] = useState<Book | null>(null);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (bookId) {
      fetch(`/api/books/${bookId}`)
        .then((res) => res.json())
        .then((data) => setBook(data))
        .catch((error) => console.error("Error fetching book details:", error));
    }
  }, [bookId]);

  const handleIssueBook = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      const res = await fetch("/api/books/issue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, bookId: parseInt(bookId!, 10) }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Book issued successfully!");
        router.push("/user");
      } else {
        alert(result.error || "Failed to issue book.");
      }
    } catch (error) {
      console.error("Error issuing book:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!book) {
    return <p>Loading book details...</p>;
  }

  return (
    <>
    
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white flex flex-col items-center py-16 px-6">
      <h1 className="text-4xl font-bold mb-6">Issue Book</h1>
      <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
        <p className="text-lg mb-4">Author: {book.author}</p>
        <Image
          src={book.picture}
          alt={book.title}
          width={500} // Example width
          height={750} // Example height
          className="w-full h-auto rounded-lg mb-4"
        />

        <div>
          <label htmlFor="email" className="block mb-2 text-gray-600">
            Enter Your Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded text-gray-800"
          />
        </div>
        <button
          onClick={handleIssueBook}
          className="mt-4 w-full bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition"
        >
          Confirm Issue
        </button>
      </div>
    </div></>
  );
}

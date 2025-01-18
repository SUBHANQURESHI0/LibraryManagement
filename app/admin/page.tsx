"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

type Book = {
  id: number;
  title: string;
  author: string;
  picture: string;
  createdAt: string;
  issuedById?: number | null;
  issuedDate?: string | null;
  dueDate?: string | null;
  issuedBy?: { email: string };
};

type IssuedBook = {
  id: number;
  title: string;
  author: string;
  issuedBy: {
    email: string;
  };
  issuedDate: string;
};

export default function AdminDashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [overdueBooks, setOverdueBooks] = useState<Book[]>([]);
  const [issuedBooks, setIssuedBooks] = useState<IssuedBook[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch all books
    fetch("/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));

    // Fetch overdue books
    fetch("/api/books/overdue")
      .then((res) => res.json())
      .then((data) => setOverdueBooks(data));

    // Fetch issued books
    fetch("/api/books/issue-table")
      .then((res) => res.json())
      .then((data) => setIssuedBooks(data))
      .catch((error) => console.error("Error fetching issued books:", error));
  }, []);

  const handleAddBooks = () => {
    router.push("/admin/add-book");
  };

  const handleDeleteBook = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this book?");
    if (!confirmed) return;

    try {
      const response = await fetch("/api/books", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        alert("Book deleted successfully!");
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        setOverdueBooks((prevOverdue) =>
          prevOverdue.filter((book) => book.id !== id)
        );
        setIssuedBooks((prevIssuedBooks) =>
          prevIssuedBooks.filter((book) => book.id !== id)
        );
      } else {
        alert("Failed to delete the book.");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white px-6 md:px-12 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide leading-tight">
          Admin Dashboard
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-80">
          Manage books, track overdue issues, and keep the library organized
          effortlessly.
        </p>
        <button
          onClick={handleAddBooks}
          className="px-10 py-4 bg-teal-500 text-lg font-semibold rounded-full shadow-xl transition-transform transform hover:scale-110 hover:shadow-2xl hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300"
        >
          Add Books
        </button>
      </div>

      <div className="w-full max-w-6xl">
        {/* All Books Section */}
        <h2 className="text-3xl font-semibold mb-4">All Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white text-gray-800 rounded-lg p-4 shadow">
              <Image
                src={book.picture}
                alt={book.title}
                width={200}
                height={300}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-2">{book.title}</h3>
              <p className="text-gray-600">{book.author}</p>
              {book.issuedBy ? (
                <p className="text-red-500">
                  Issued by: {book.issuedBy.email} (Due:{" "}
                  {new Date(book.dueDate!).toLocaleDateString()})
                </p>
              ) : (
                <p className="text-green-500">Available</p>
              )}
              <button
                onClick={() => handleDeleteBook(book.id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Overdue Books Section */}
        <h2 className="text-3xl font-semibold mt-10 mb-4">Overdue Books</h2>
        <ul className="list-disc pl-6 text-lg">
          {overdueBooks.length > 0 ? (
            overdueBooks.map((book) => (
              <li key={book.id}>
                {book.title} by {book.author} (Issued to: {book.issuedBy?.email},{" "}
                Due: {new Date(book.dueDate!).toDateString()})
                <button
                  onClick={() => handleDeleteBook(book.id)}
                  className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <p className="text-green-300">No overdue books at the moment.</p>
          )}
        </ul>

        {/* Issued Books Table */}
        <h2 className="text-3xl font-semibold mt-10 mb-4">Issued Books</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 bg-white text-gray-800 rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Book Title</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Issued To</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date of Issue</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {issuedBooks.map((book) => (
                <tr key={book.id}>
                  <td className="border border-gray-300 px-4 py-2">{book.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.author}</td>
                  <td className="border border-gray-300 px-4 py-2">{book.issuedBy.email}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(book.issuedDate).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div></>
  );
}

"use client";

import Navbar from "@/components/Navbar";
import React, { useState } from "react";

const AddBookPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [picture, setPicture] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!picture) {
      alert("Please upload a picture.");
      return;
    }

    // Convert picture to Base64
    const reader = new FileReader();
    reader.readAsDataURL(picture);
    reader.onload = async () => {
      const pictureBase64 = reader.result;

      // Send the request to the API
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author, pictureBase64 }),
      });

      if (response.ok) {
        alert("Book added successfully!");
        setTitle("");
        setAuthor("");
        setPicture(null);
      } else {
        alert("Failed to add the book.");
      }
    };
  };

  return (
    <>
    <Navbar/>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white px-6 md:px-12 py-16">
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">
          Add a New Book
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter book title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Author
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter author's name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Picture
            </label>
            <input
              type="file"
              onChange={(e) => setPicture(e.target.files?.[0] || null)}
              accept="image/*"
              className="w-full text-gray-700"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            Add Book
          </button>
        </form>
      </div>
    </div></>
  );
};

export default AddBookPage;

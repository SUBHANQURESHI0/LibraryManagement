export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700">
      <div className="text-center text-white px-6 md:px-12 py-16">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-wide leading-tight">
          Welcome to the{" "}
          <span className="text-teal-300">Library Management System</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-80">
          A modern and simple way to manage all your library books and user
          accounts. Access, organize, and manage with ease.
        </p>

        <div className="flex justify-center gap-8">
          <a href="/auth/login">
            <button className="px-10 py-4 bg-teal-500 text-white text-lg font-semibold rounded-full shadow-xl transition-transform transform hover:scale-110 hover:shadow-2xl hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300">
              Login
            </button>
          </a>

          <a href="/auth/register">
            <button className="px-10 py-4 border-2 border-white text-white text-lg font-semibold rounded-full transition-transform transform hover:scale-110 hover:bg-white hover:text-gray-800 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-teal-300">
              Sign Up
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

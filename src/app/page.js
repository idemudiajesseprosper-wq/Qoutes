"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Page() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch quote from internal API route
  const getRandomQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/quote", { cache: "no-store" });
      const data = await res.json();
      setQuote({ text: data[0].q, author: data[0].a });
    } catch (error) {
      console.error("Failed to fetch quote:", error);
      setQuote({ text: "Could not load a quote. Try again!", author: "" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  // Share quote
  const shareQuote = () => {
    if (navigator.share) {
      navigator.share({
        title: "Quote of the Day",
        text: `${quote.text} — ${quote.author}`,
      });
    } else {
      navigator.clipboard.writeText(`${quote.text} — ${quote.author}`);
      alert("Quote copied to clipboard!");
    }
  };

  return (
    <main
      className={`flex flex-col min-h-screen items-center justify-center p-6 transition-colors duration-700 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl sm:text-3xl font-bold mb-8 tracking-tight"
      >
        🌟 Quote of the Day
      </motion.h1>

      {/* Quote Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`max-w-lg w-full text-center p-8 rounded-2xl shadow-2xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {loading ? (
          <p className="text-gray-500 text-lg">Loading quote...</p>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={quote.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl sm:text-2xl font-semibold mb-4 leading-relaxed">
                “{quote.text}”
              </p>
              <p className="text-gray-400 mb-6 text-sm sm:text-base">
                — {quote.author}
              </p>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <button
            onClick={getRandomQuote}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm sm:text-base hover:bg-blue-700 transition"
          >
            New Quote
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg text-sm sm:text-base hover:bg-gray-400 transition"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <button
            onClick={shareQuote}
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm sm:text-base hover:bg-green-700 transition"
          >
            Share
          </button>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-10 text-sm text-gray-400 text-center">
        <p>
          Built with ❤️ using <span className="font-semibold">Next.js</span> &{" "}
          <span className="font-semibold">Tailwind CSS</span>
        </p>
      </footer>
    </main>
  );
}

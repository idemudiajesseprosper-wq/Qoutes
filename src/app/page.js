"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Page() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // Fetch random quote from ZenQuotes
  const getRandomQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/quote", { cache: "no-store" });
      const data = await res.json();
      setQuote({ text: data[0].q, author: data[0].a });
    } catch (error) {
      console.error("Failed to fetch quote:", error);
      setQuote({ text: "Failed to load quote. Try again!", author: "" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  // Share quote function
  const shareQuote = () => {
    if (navigator.share) {
      navigator.share({
        title: "Inspiring Quote",
        text: `${quote.text} — ${quote.author}`,
      });
    } else {
      navigator.clipboard.writeText(`${quote.text} — ${quote.author}`);
      alert("Quote copied to clipboard!");
    }
  };

  return (
    <main
      className={`flex min-h-screen items-center justify-center p-6 transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`max-w-lg w-full text-center p-8 rounded-2xl shadow-lg ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {loading ? (
          <p className="text-gray-500">Loading quote...</p>
        ) : (
          <>
            <motion.p
              key={quote.text}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-semibold mb-4"
            >
              “{quote.text}”
            </motion.p>
            <p className="text-gray-500 mb-6">— {quote.author}</p>

            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={getRandomQuote}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                New Quote
              </button>

              <button
                onClick={() => setDarkMode(!darkMode)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>

              <button
                onClick={shareQuote}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Share
              </button>
            </div>
          </>
        )}
      </motion.div>
    </main>
  );
}

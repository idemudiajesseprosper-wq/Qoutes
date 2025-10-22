"use client";
import { useState } from "react";

export default function Page() {
  const quotes = [
    {
      quote: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
    },
    {
      quote: "In the middle of every difficulty lies opportunity.",
      author: "Albert Einstein",
    },
    {
      quote:
        "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
    },
    {
      quote:
        "Happiness is not something ready made. It comes from your own actions.",
      author: "Dalai Lama",
    },
    {
      quote: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt",
    },
    {
      quote: "Don’t watch the clock; do what it does. Keep going.",
      author: "Sam Levenson",
    },
    {
      quote:
        "Your time is limited, so don’t waste it living someone else’s life.",
      author: "Steve Jobs",
    },
    {
      quote: "It does not matter how slowly you go as long as you do not stop.",
      author: "Confucius",
    },
    {
      quote:
        "The future belongs to those who believe in the beauty of their dreams.",
      author: "Eleanor Roosevelt",
    },
    {
      quote: "The best way to predict your future is to create it.",
      author: "Peter Drucker",
    },
  ];

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  const handleNewQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

   const handleShareQuote = () => {
    const message = `“${currentQuote.text}” — ${currentQuote.author}\n\nRead more quotes here: https://qoutes-phi.vercel.app/`;

    if (navigator.share) {
      // ✅ If the browser supports Web Share API
      navigator
        .share({
          title: "Inspirational Quote",
          text: message,
          url: "https://qoutes-phi.vercel.app/",
        })
        .then(() => console.log("Quote shared successfully"))
        .catch((err) => console.log("Share failed:", err));
    } else {
      // ❌ Fallback for unsupported browsers
      navigator.clipboard.writeText(message);
      alert("Quote copied to clipboard! You can now paste and share it.");
    }
  };



  return (
    <div className="items-center justify-center flex flex-col min-h-screen bg-white text-black">
      <h1 className="text-4xl text-center font-bold">
         Simple Quotes To Keep You Motivated
      </h1>

      <div className=" rounded-2xl shadow-2xl max-w-3xl px-5 space-y-4 sm:max-w-lg p-10 md:max-w-xl sm:p-8">
        <p className="font-medium mb-4 leading-relaxed text-lg text-center">“{currentQuote.quote}”</p>
        <p className="text-center text-sm">— {currentQuote.author}</p>
        

        <div className="flex sm:flex-row gap-4 justify-center mt-5">
          <button 
          onClick={handleNewQuote}
          className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-500 transition cursor-pointer">
          New Quote
        </button>

        <button 
        onClick={handleShareQuote}
        className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-500 transition cursor-pointer">
          Share
        </button>
      </div>
        
        
        
      </div>




      </div>
  );
}


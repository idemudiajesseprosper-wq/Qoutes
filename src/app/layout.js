import "./globals.css";

export const metadata = {
  title: "Quotes App",
  description: "Get a random quote of the day",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-white">
      <body className="bg-gradient-to-b from-gray-50 to-white text-gray-900 min-h-screen">
        <div className="flex flex-col min-h-screen">
          {/* Main */}
          <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  );
}

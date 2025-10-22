import "./globals.css";

export const metadata = {
  title: "Quotes App",
  description: "Get a random quote of the day",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-white">
      <body>
        <div>
          {/* Main */}
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}

import "./globals.css";

export const metadata = {
  title: "Quotes App",
  description: "Get a random quote of the day",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-white">
      <head>
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      
      </head>
      <body>
        <div>
          {/* Main */}
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}

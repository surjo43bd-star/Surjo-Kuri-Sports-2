import "./globals.css";

export const metadata = {
  title: "SURJO KURI SPORTS",
  description: "Sports Registration Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

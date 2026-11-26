import "./globals.css";

export const metadata = {
  title: "SURJO KURI SPORTS",
  description: "Sports registration form"
};

export default function RootLayout({ children }) {
  return <html lang="bn"><body>{children}</body></html>;
}
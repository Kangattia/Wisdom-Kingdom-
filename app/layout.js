import "./globals.css";

export const metadata = {
  title: "Wisdom Kingdom",
  description: "The Kingdom of Knowledge Awaits",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

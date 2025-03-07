import type { Metadata } from "next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="html">
      <body id="body">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Auth from "@/components/auth";

export const metadata: Metadata = {
  title: "Example",
  description: "Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Auth>
          {children}
        </Auth>
      </body>
    </html>
  );
}

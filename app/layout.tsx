import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import HeaderAuth from "./components/HeaderAuth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* 顶部导航 */}
        <header className="bg-zinc-900 text-white py-4 px-8">
          <nav className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/" className="text-xl font-bold hover:text-blue-400">
              Next.js App
            </Link>
            <div className="flex gap-6 items-center">
              <Link href="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
              <Link href="/user" className="hover:text-blue-400 transition-colors">
                User
              </Link>
              <Link href="/profile" className="hover:text-blue-400 transition-colors">
                Profile
              </Link>
              <HeaderAuth />
            </div>
          </nav>
        </header>

        {/* 中间内容区 */}
        <main className="flex-1 bg-zinc-50 dark:bg-zinc-900 flex flex-col">
          {children}
        </main>

        {/* 底部 Footer */}
        <footer className="bg-zinc-900 text-white py-6 px-8">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-zinc-400">© 2026 Next.js 科技</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

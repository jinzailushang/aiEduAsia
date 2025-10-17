import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 编程教育 - AI 驱动的编程学习平台",
  description: "高质量编程课程，AI 智能辅导，让你的学习效率提升 10 倍。从零基础到进阶，总有适合你的课程。",
  keywords: ["编程教育", "AI 学习", "在线课程", "Python", "JavaScript", "全栈开发"],
  authors: [{ name: "AI 编程教育" }],
  creator: "AI 编程教育",
  publisher: "AI 编程教育",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-edu.asia'),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://ai-edu.asia",
    title: "AI 编程教育 - AI 驱动的编程学习平台",
    description: "高质量编程课程，AI 智能辅导，让你的学习效率提升 10 倍",
    siteName: "AI 编程教育",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI 编程教育 - AI 驱动的编程学习平台",
    description: "高质量编程课程，AI 智能辅导，让你的学习效率提升 10 倍",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

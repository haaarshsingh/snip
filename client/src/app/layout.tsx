import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const display = localFont({
  src: "./fonts/söhne.woff2",
  variable: "--font-display",
  weight: "400",
});

const mono = localFont({
  src: "./fonts/commit-mono.woff2",
  variable: "--font-mono",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://snip.tf"),
  title: {
    default: "snip",
    template: "%s — snip",
  },
  creator: "Harsh Singh",
  publisher: "Harsh Singh",
  description: "The modern Pastebin written in Rust.",
  keywords: [
    "pastebin",
    "hastebin",
    "pastemyst",
    "mozilla paste",
    "code sharing online",
    "code share",
    "geeksforgeeks ide",
    "jsfiddle",
    "centos paste",
    "pastelink",
    "pasted",
    "toptal hastebin",
    "paste code",
    "share code",
    "debian paste",
    "bpaste",
  ],
  authors: [
    { name: "Harsh Singh", url: "https://harshsingh.xyz" },
    { name: "Ibrahim Hisham", url: "https://ibra.pk" },
  ],
  openGraph: {
    title: "snip",
    description: " The modern Pastebin written in Rust.",
    url: "https://snip.tf",
    siteName: "snip",
    images: [{ url: "https://snip.tf/og.png", width: 1200, height: 630 }],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "snip",
    description: "The modern Pastebin written in Rust.",
    siteId: "snip",
    creator: "@haaarshsingh",
    creatorId: "haaarshsingh",
    images: {
      url: "https://snip.tf/og.png",
      alt: "",
    },
  },
  verification: {
    google: "VWhTtgTikPqvWIY4n2rlUj6Fe9YgkfFMEET3TM7Rce0",
    yandex: "cfc27cbb03eb0a9c",
    yahoo: "yahoo",
    other: { me: ["hi.harsh@pm.me"] },
  },
  alternates: { canonical: "https://snip.tf" },
  category: "technology",
};

export default ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${display.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
};

import type React from "react"
import type { Metadata } from "next"
import { Roboto_Flex } from "next/font/google"
import "./globals.css"

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-flex",
})

export const metadata: Metadata = {
  title: "Hotelna – A New Experience is Coming Soon",
  description: "The new Hotelna experience is on its way. Stay tuned.",
  keywords: ["hotelna", "hospitality", "hotel", "consultancy", "luxury", "bespoke", "solomon khaddour"],
  authors: [{ name: "Solomon Khaddour" }],
  creator: "Solomon Khaddour",
  publisher: "Hotelna",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://hotelna.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#d5b15f" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Hotelna – A New Experience is Coming Soon",
    description: "The new Hotelna experience is on its way. Stay tuned.",
    url: "https://hotelna.com",
    siteName: "Hotelna",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hotelna OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotelna – A New Experience is Coming Soon",
    description: "The new Hotelna experience is on its way. Stay tuned.",
    images: ["/images/og-image.png"],
    creator: "@hotelna",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={robotoFlex.variable}>
      <body className="font-roboto-flex">{children}</body>
    </html>
  )
}

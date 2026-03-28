import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RootLayoutClient } from "@/components/RootLayoutClient";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Real-Time Voting Platform",
	description: "Cast your vote in our real-time voting platform with OTP verification, live leaderboards, and more.",
	keywords: ["voting", "real-time", "models", "leaderboard"],
	authors: [{ name: "Samuel K W" }],
	openGraph: {
		title: "Real-Time Voting Platform",
		description: "Cast your vote in our real-time voting platform",
		type: "website",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
	themeColor: "#2563eb",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<RootLayoutClient>{children}</RootLayoutClient>
			</body>
		</html>
	);
}

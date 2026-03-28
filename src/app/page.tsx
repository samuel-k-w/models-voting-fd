import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
	return (
		<main className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
			<div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
				{/* Header */}
				<div className="text-center">
					<h1 className="text-balance text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
						Real-Time Voting Platform
					</h1>
					<p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
						Cast your vote for your favorite model in our secure, real-time voting system with live leaderboards and instant results.
					</p>
				</div>

				{/* Features Grid */}
				<div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					<FeatureCard
						title="Secure Voting"
						description="OTP verification ensures each vote is authentic and secure"
					/>
					<FeatureCard
						title="Real-Time Updates"
						description="Watch vote counts update instantly across all devices via WebSocket"
					/>
					<FeatureCard
						title="Live Leaderboard"
						description="See the top models ranked by votes in real-time"
					/>
					<FeatureCard
						title="Mobile Optimized"
						description="Seamless voting experience on any device or screen size"
					/>
					<FeatureCard
						title="Admin Dashboard"
						description="Manage models, monitor voting activity, and generate reports"
					/>
					<FeatureCard
						title="Judge Panel"
						description="Specialized interface for judges and event organizers"
					/>
				</div>

				{/* CTA */}
				<div className="mt-16 flex justify-center gap-4">
					<Link href="/voting">
						<Button variant="primary" size="lg" className="text-base">
							Start Voting
						</Button>
					</Link>
					<a href="https://github.com/samuel-k-w/models-voting-fd" target="_blank" rel="noopener noreferrer">
						<Button variant="outline" size="lg" className="text-base">
							View Source
						</Button>
					</a>
				</div>

				{/* Footer */}
				<div className="mt-24 border-t border-gray-200 pt-12 text-center dark:border-gray-800">
					<p className="text-sm text-gray-600 dark:text-gray-400">
						Real-Time Voting Platform • Built with Next.js, TypeScript & Tailwind CSS
					</p>
				</div>
			</div>
		</main>
	);
}

function FeatureCard({
	title,
	description,
}: {
	title: string;
	description: string;
}) {
	return (
		<div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/50">
			<h3 className="text-lg font-semibold text-gray-900 dark:text-white">
				{title}
			</h3>
			<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
				{description}
			</p>
		</div>
	);
}

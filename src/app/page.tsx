import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

export default function Home() {
	return (
		<main className="min-h-screen bg-background">
			{/* Hero Section */}
			<div className="border-b border-border">
				<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
					<div className="text-center space-y-6">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-light text-primary text-sm font-medium">
							🚀 Premium Voting Platform
						</div>
						<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground text-pretty">
							Real-Time Voting Platform
						</h1>
						<p className="text-xl text-foreground-secondary max-w-2xl mx-auto text-pretty">
							Enterprise-grade voting system with real-time updates, secure authentication, and comprehensive analytics. Perfect for models contests, competitions, and events.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
							<Link href="/voting">
								<Button variant="primary" size="lg" className="text-base px-8">
									Start Voting
								</Button>
							</Link>
							<Link href="/leaderboard">
								<Button variant="outline" size="lg" className="text-base px-8">
									View Leaderboard
								</Button>
							</Link>
							<Link href="/judge/login">
								<Button variant="outline" size="lg" className="text-base px-8">
									Judge Login
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Features Section */}
			<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
						Powerful Features
					</h2>
					<p className="text-foreground-secondary text-lg">
						Everything you need for seamless, secure voting
					</p>
				</div>

				<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
					<FeatureCard
						icon="🔐"
						title="Secure Authentication"
						description="OTP-based verification ensures each vote is authentic and tamper-proof"
					/>
					<FeatureCard
						icon="⚡"
						title="Real-Time Updates"
						description="Watch vote counts update instantly across all devices via WebSocket"
					/>
					<FeatureCard
						icon="📊"
						title="Live Leaderboard"
						description="Dynamic ranking with instant updates and performance metrics"
					/>
					<FeatureCard
						icon="📱"
						title="Mobile First"
						description="Fully responsive design optimized for all screen sizes"
					/>
					<FeatureCard
						icon="🎯"
						title="Judge Panel"
						description="Weighted voting system with specialized judge interface"
					/>
					<FeatureCard
						icon="📈"
						title="Analytics"
						description="Comprehensive dashboards with voting trends and insights"
					/>
				</div>
			</div>

			{/* Stats Section */}
			<div className="bg-background-secondary border-y border-border">
				<div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
					<div className="grid gap-8 sm:grid-cols-3">
						<StatItem label="Total Votes" value="47,293" />
						<StatItem label="Active Models" value="24" />
						<StatItem label="Judges" value="12" />
					</div>
				</div>
			</div>

			{/* CTA Section */}
			<div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
				<Card variant="elevated" className="text-center">
					<CardContent className="space-y-6 py-12">
						<h2 className="text-3xl font-bold text-foreground">
							Ready to vote?
						</h2>
						<p className="text-foreground-secondary text-lg">
							Join thousands of voters in our secure, real-time voting platform
						</p>
						<Link href="/voting">
							<Button variant="primary" size="lg" className="text-base">
								Cast Your Vote Now
							</Button>
						</Link>
					</CardContent>
				</Card>
			</div>

			{/* Footer */}
			<footer className="border-t border-border">
				<div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
					<div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground-secondary">
						<p>Real-Time Voting Platform • Built with Next.js, TypeScript & Tailwind CSS</p>
						<div className="flex gap-6">
							<a href="#" className="hover:text-foreground transition-colors">Documentation</a>
							<a href="#" className="hover:text-foreground transition-colors">GitHub</a>
							<a href="#" className="hover:text-foreground transition-colors">Support</a>
						</div>
					</div>
				</div>
			</footer>
		</main>
	);
}

interface FeatureCardProps {
	icon: string;
	title: string;
	description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
	return (
		<Card>
			<CardContent className="space-y-3">
				<div className="text-4xl">{icon}</div>
				<h3 className="text-lg font-semibold text-foreground">{title}</h3>
				<p className="text-sm text-foreground-secondary">{description}</p>
			</CardContent>
		</Card>
	);
}

interface StatItemProps {
	label: string;
	value: string;
}

function StatItem({ label, value }: StatItemProps) {
	return (
		<div className="text-center">
			<div className="text-3xl sm:text-4xl font-bold text-primary">{value}</div>
			<div className="mt-2 text-foreground-secondary">{label}</div>
		</div>
	);
}

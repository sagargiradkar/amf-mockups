// src/pages/RegisterUpdatesPage.tsx
import { useState } from "react";
import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/Button";

export default function RegisterUpdatesPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [topics, setTopics] = useState<string[]>([]);
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const allTopics = [
		"Product updates",
		"Documentation changes",
		"Training content",
		"Service & maintenance",
	];

	const toggleTopic = (topic: string) => {
		setTopics((prev) =>
			prev.includes(topic)
				? prev.filter((t) => t !== topic)
				: [...prev, topic]
		);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setSuccess(null);

		if (!email.trim()) {
			setError("Email is required.");
			return;
		}

		try {
			setSubmitting(true);
			// TODO: call your backend API here
			await new Promise((res) => setTimeout(res, 800));

			setSuccess("You are now registered to receive updates.");
			setName("");
			setEmail("");
			setTopics([]);
		} catch (err) {
			setError("Something went wrong. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Layout>
			<div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
				{/* Header */}
				<div className="mb-8 text-center">
					<h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide">
						Register for Updates
					</h1>
					<p className="mt-2 text-sm sm:text-base text-muted-foreground">
						Get notified when updated documentation, training
						content, or products are available.
					</p>
				</div>
				{/* Card */}
				<div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
					<form className="space-y-6" onSubmit={handleSubmit}>
						{/* Name */}
						<div>
							<label className="block text-sm font-medium mb-1">
								Name{" "}
								<span className="text-muted-foreground text-xs">
									(optional)
								</span>
							</label>
							<input
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-destructive/40"
								placeholder="Your name"
							/>
						</div>

						{/* Email */}
						<div>
							<label className="block text-sm font-medium mb-1">
								Email address{" "}
								<span className="text-destructive">*</span>
							</label>
							<input
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-destructive/40"
								placeholder="you@example.com"
							/>
						</div>

						{/* Topics */}
						{/* <div>
							<label className="block text-sm font-medium mb-2">
								What would you like to hear about?
							</label>
							<div className="flex flex-wrap gap-2">
								{allTopics.map((topic) => {
									const active = topics.includes(topic);
									return (
										<button
											key={topic}
											type="button"
											onClick={() => toggleTopic(topic)}
											className={`rounded-full border px-3 py-1 text-xs sm:text-sm transition-colors ${
												active
													? "bg-destructive text-white border-destructive"
													: "bg-background text-foreground border-border hover:bg-accent"
											}`}
										>
											{topic}
										</button>
									);
								})}
							</div>
						</div> */}

						{/* Legal */}
						<div className="flex items-start gap-2 text-xs text-muted-foreground">
							<input
								id="agree"
								type="checkbox"
								className="mt-0.5 h-4 w-4 rounded border-border text-destructive focus:ring-destructive/40"
								required
							/>
							<label htmlFor="agree">
								I agree to receive email communications about
								product news, documentation, and training. I can
								unsubscribe at any time.
							</label>
						</div>

						{/* Status */}
						{error && (
							<p className="text-xs text-destructive">{error}</p>
						)}
						{success && (
							<p className="text-xs text-emerald-600">
								{success}
							</p>
						)}

						{/* Submit */}
						<Button
							type="submit"
							className="w-full sm:w-auto px-6"
							disabled={submitting}
						>
							{submitting
								? "Submitting..."
								: "Register for Updates"}
						</Button>
					</form>
				</div>
			</div>
		</Layout>
	);
}
// }
// // src/pages/RegisterUpdatesPage.tsx
// import { useState } from "react";
// import { Layout } from "../components/layout/Layout";
// import { Button } from "../components/ui/Button";

// export default function RegisterUpdatesPage() {
//   const [submitting, setSubmitting] = useState(false);
//   const [success, setSuccess] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     try {
//       setSubmitting(true);
//       // TODO: call your backend API here
//       // Use the authenticated user's email from session/context
//       await new Promise((res) => setTimeout(res, 800));

//       setSuccess("You are now registered to receive updates.");
//     } catch (err) {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Layout>
//       <div className="p-4 sm:p-6 md:p-8 max-w-3xl mx-auto">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide">
//             Register for Updates
//           </h1>
//           <p className="mt-2 text-sm sm:text-base text-muted-foreground">
//             Get notified when updated documentation, training content, or products are available.
//           </p>
//           <p className="mt-2 text-sm text-muted-foreground">
//             Need to register someone else?{" "}
//             <a href="/contact-ccr" className="text-destructive hover:underline">
//               Contact your CCR
//             </a>
//           </p>
//         </div>

//         {/* Card */}
//         <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {/* Status */}
//             {error && <p className="text-xs text-destructive">{error}</p>}
//             {success && <p className="text-xs text-emerald-600">{success}</p>}

//             {/* Submit */}
//             <Button
//               type="submit"
//               className="w-full sm:w-auto px-6"
//               disabled={submitting}
//             >
//               {submitting ? "Registering..." : "Register for Updates"}
//             </Button>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// }

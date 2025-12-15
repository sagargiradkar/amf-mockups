// src/pages/RegisterUpdatesPage.tsx
import { useState } from "react";
import { Layout } from "../components/layout/Layout";
import { Button } from "../components/ui/Button";

type TabType = "register" | "colleague" | "unsubscribe";

export default function RegisterUpdatesPage() {
    const [activeTab, setActiveTab] = useState<TabType>("register");
    
    // Assume these come from user profile/context
    const userProfile = {
        name: "Mike Ross",
        email: "miker@ithena.ai",
        phone: "8484670267",
        isSubscribed: true // Set based on actual subscription status
    };

    // Register tab state
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Colleague tab state
    const [colleagueName, setColleagueName] = useState("");
    const [colleaguePhone, setColleaguePhone] = useState("");
    const [colleagueAuthorized, setColleagueAuthorized] = useState(false);
    const [colleagueSubmitting, setColleagueSubmitting] = useState(false);
    const [colleagueSuccess, setColleagueSuccess] = useState<string | null>(null);
    const [colleagueError, setColleagueError] = useState<string | null>(null);

    // Unsubscribe tab state
    const [unsubscribing, setUnsubscribing] = useState(false);
    const [unsubscribeSuccess, setUnsubscribeSuccess] = useState<string | null>(null);
    const [unsubscribeError, setUnsubscribeError] = useState<string | null>(null);

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            setSubmitting(true);
            // TODO: call your backend API here
            await new Promise((res) => setTimeout(res, 800));

            setSuccess("You are now registered to receive updates.");
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleColleagueSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setColleagueError(null);
        setColleagueSuccess(null);

        if (!colleagueName.trim()) {
            setColleagueError("Colleague name is required.");
            return;
        }

        if (!colleaguePhone.trim()) {
            setColleagueError("Colleague phone is required.");
            return;
        }

        if (!colleagueAuthorized) {
            setColleagueError("You must authorize the CCR to contact your colleague.");
            return;
        }

        try {
            setColleagueSubmitting(true);
            // TODO: call your backend API here
            await new Promise((res) => setTimeout(res, 800));

            setColleagueSuccess("Request submitted. Your CCR will contact your colleague to process the registration.");
            setColleagueName("");
            setColleaguePhone("");
            setColleagueAuthorized(false);
        } catch (err) {
            setColleagueError("Something went wrong. Please try again.");
        } finally {
            setColleagueSubmitting(false);
        }
    };

    const handleUnsubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setUnsubscribeError(null);
        setUnsubscribeSuccess(null);

        try {
            setUnsubscribing(true);
            // TODO: call your backend API here
            await new Promise((res) => setTimeout(res, 800));

            setUnsubscribeSuccess("You have been unsubscribed from updates.");
        } catch (err) {
            setUnsubscribeError("Something went wrong. Please try again.");
        } finally {
            setUnsubscribing(false);
        }
    };

    return (
        <Layout>
            <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide">
                        Manage Updates
                    </h1>
                    <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                        Register for updates, request colleague access, or manage your subscription.
                    </p>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="border-b border-border">
                        <nav className="flex gap-4 sm:gap-8" aria-label="Tabs">
                            <button
                                onClick={() => setActiveTab("register")}
                                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                                    activeTab === "register"
                                        ? "border-destructive text-destructive"
                                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                                }`}
                            >
                                Register for updates
                            </button>
                            <button
                                onClick={() => setActiveTab("colleague")}
                                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                                    activeTab === "colleague"
                                        ? "border-destructive text-destructive"
                                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                                }`}
                            >
                                Request Colleague Access
                            </button>
                            <button
                                onClick={() => setActiveTab("unsubscribe")}
                                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                                    activeTab === "unsubscribe"
                                        ? "border-destructive text-destructive"
                                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                                }`}
                                disabled={!userProfile.isSubscribed}
                            >
                                Unsubscribe
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Card with Tab Content */}
                <div className="rounded-xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                    {/* Register Tab */}
                    {activeTab === "register" && (
                        <form className="space-y-6" onSubmit={handleRegisterSubmit}>
                            <p className="text-sm text-muted-foreground">
                                Get notified when updated documentation, training content, or products are available.
                            </p>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Name <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={userProfile.name}
                                    disabled
                                    className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm cursor-not-allowed opacity-70"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Email address <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={userProfile.email}
                                    disabled
                                    className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm cursor-not-allowed opacity-70"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Phone <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={userProfile.phone}
                                    disabled
                                    className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm cursor-not-allowed opacity-70"
                                />
                            </div>

                            {/* Legal */}
                            <div className="flex items-start gap-2 text-xs text-muted-foreground">
                                <input
                                    id="agree-register"
                                    type="checkbox"
                                    className="mt-0.5 h-4 w-4 rounded border-border text-destructive focus:ring-destructive/40"
                                    required
                                />
                                <label htmlFor="agree-register">
                                    I agree to receive updated documentation. I can unsubscribe at any time.
                                </label>
                            </div>

                            {/* Status */}
                            {error && <p className="text-xs text-destructive">{error}</p>}
                            {success && <p className="text-xs text-emerald-600">{success}</p>}

                            {/* Submit */}
                            <Button
                                type="submit"
                                className="w-full sm:w-auto px-6"
                                disabled={submitting}
                            >
                                {submitting ? "Registering..." : "Register for updates"}
                            </Button>
                        </form>
                    )}

                    {/* Request Colleague Access Tab */}
                    {activeTab === "colleague" && (
                        <form className="space-y-6" onSubmit={handleColleagueSubmit}>
                            <p className="text-sm text-muted-foreground">
                                Request update registration on behalf of a colleague. Your CCR will contact them to complete the process.
                            </p>

                            {/* Your Name */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Your Name <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={userProfile.name}
                                    disabled
                                    className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm cursor-not-allowed opacity-70"
                                />
                            </div>

                            {/* Your Email */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Your Email <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={userProfile.email}
                                    disabled
                                    className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm cursor-not-allowed opacity-70"
                                />
                            </div>

                            {/* Your Phone */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Your Phone <span className="text-destructive">*</span>
                                </label>
                                <input
                                    type="tel"
                                    value={userProfile.phone}
                                    disabled
                                    className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm cursor-not-allowed opacity-70"
                                />
                            </div>

                            <div className="border-t border-border pt-6">
                                <h3 className="text-sm font-semibold mb-4">Colleague Information</h3>

                                {/* Colleague Name */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">
                                        Colleague Name <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={colleagueName}
                                        onChange={(e) => setColleagueName(e.target.value)}
                                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-destructive/40"
                                        placeholder="Enter colleague's name"
                                        required
                                    />
                                </div>

                                {/* Colleague Phone */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Colleague Phone <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={colleaguePhone}
                                        onChange={(e) => setColleaguePhone(e.target.value)}
                                        className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-destructive/40"
                                        placeholder="Enter colleague's phone"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Authorization */}
                            <div className="flex items-start gap-2 text-xs text-muted-foreground">
                                <input
                                    id="authorize-colleague"
                                    type="checkbox"
                                    checked={colleagueAuthorized}
                                    onChange={(e) => setColleagueAuthorized(e.target.checked)}
                                    className="mt-0.5 h-4 w-4 rounded border-border text-destructive focus:ring-destructive/40"
                                    required
                                />
                                <label htmlFor="authorize-colleague">
                                    I am requesting update registration on behalf of my colleague. I authorize the CCR to contact them to process my request.
                                </label>
                            </div>

                            {/* Status */}
                            {colleagueError && <p className="text-xs text-destructive">{colleagueError}</p>}
                            {colleagueSuccess && <p className="text-xs text-emerald-600">{colleagueSuccess}</p>}

                            {/* Submit */}
                            <Button
                                type="submit"
                                className="w-full sm:w-auto px-6"
                                disabled={colleagueSubmitting}
                            >
                                {colleagueSubmitting ? "Submitting..." : "Request Registration"}
                            </Button>
                        </form>
                    )}

                    {/* Unsubscribe Tab */}
                    {activeTab === "unsubscribe" && (
                        <form className="space-y-6" onSubmit={handleUnsubscribe}>
                            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 p-4">
                                <div className="flex gap-3">
                                    <svg
                                        className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                    <div>
                                        <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-400 mb-1">
                                            Important Notice
                                        </h3>
                                        <p className="text-sm text-amber-700 dark:text-amber-500">
                                            Unsubscribing will stop all documentation updates, training content notifications, and product announcements. You will no longer receive important information about system changes or new features.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground">
                                If you wish to unsubscribe from update notifications, please confirm below. You can always re-register later if you change your mind.
                            </p>

                            {/* Current subscription info */}
                            <div className="rounded-lg bg-muted/50 p-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Name:</span>
                                    <span className="font-medium">{userProfile.name}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Email:</span>
                                    <span className="font-medium">{userProfile.email}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Status:</span>
                                    <span className="font-medium text-emerald-600">Subscribed</span>
                                </div>
                            </div>

                            {/* Confirmation */}
                            <div className="flex items-start gap-2 text-xs text-muted-foreground">
                                <input
                                    id="confirm-unsubscribe"
                                    type="checkbox"
                                    className="mt-0.5 h-4 w-4 rounded border-border text-destructive focus:ring-destructive/40"
                                    required
                                />
                                <label htmlFor="confirm-unsubscribe">
                                    I understand that I will no longer receive documentation updates and notifications.
                                </label>
                            </div>

                            {/* Status */}
                            {unsubscribeError && <p className="text-xs text-destructive">{unsubscribeError}</p>}
                            {unsubscribeSuccess && <p className="text-xs text-emerald-600">{unsubscribeSuccess}</p>}

                            {/* Submit */}
                            <Button
                                type="submit"
                                variant="destructive"
                                className="w-full sm:w-auto px-6"
                                disabled={unsubscribing}
                            >
                                {unsubscribing ? "Unsubscribing..." : "Unsubscribe from Updates"}
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </Layout>
    );
}

// src/components/layout/Footer.tsx
import { Globe } from "lucide-react";

export function Footer() {
	return (
		<footer className="border-t border-gray-200 bg-[#F8F8F8]">
			{/* Top support strip */}
			<div className="max-w-6xl mx-auto px-4 lg:px-0 py-6 flex flex-col md:flex-row gap-6">
				{/* Logo column */}
				<div className="flex flex-col items-center md:items-start gap-4 md:w-1/5">
					<img
						src="/amf-logo.png"
						alt="AMF Bakery Systems"
						className="h-16 w-auto object-contain"
					/>
					<div className="text-xs font-semibold tracking-wide text-gray-500">
						MAREL FOOD GROUP
					</div>
				</div>

				{/* Global support text + regions */}
				<div className="flex-1">
					<div className="mb-4 text-xs sm:text-sm font-bold tracking-wide text-gray-900 uppercase">
						GLOBAL SUPPORT · AVAILABLE 24/7 · CONTACT US TO CHAT
						WITH A TEAMMATE
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs font-bold">
						{[
							{
								region: "NORTH AMERICA",
								phone: "(+1) 804-342-9700",
							},
							{
								region: "GREATER ASIA, AUS & NZ",
								phone: "(+65) 8128-4044",
							},
							{ region: "CHINA", phone: "(+86) 150-2244-2472" },
							{
								region: "EUROPE, MIDDLE EAST, AFRICA",
								phone: "(+31) 183-627-555",
							},
							{
								region: "LATIN AMERICA",
								phone: "(+52) 229-915-3501",
							},
						].map((item) => (
							<div
								key={item.region}
								className="border-l border-gray-200 pl-4"
							>
								<div className="text-[11px] font-semibold tracking-wide text-gray-600 uppercase">
									{item.region}
								</div>
								<div className="mt-1 text-sm font-semibold text-red-600">
									{item.phone}
								</div>
							</div>
						))}
					</div>

					{/* Confidential notice */}
					<div className="mt-4 text-[10px] leading-relaxed text-gray-500 max-w-3xl">
						CONFIDENTIAL AND PROPRIETARY INFORMATION NOTICE: All
						information presented on this website, including
						pricing, product details, and service offerings, is the
						confidential and proprietary information of AMF and must
						not be disclosed to any third party without prior
						written consent.
					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className="border-t border-gray-200">
				<div className="max-w-6xl mx-auto px-4 lg:px-0 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-gray-500">
					<div className="flex flex-wrap items-center gap-2">
						<span>© 2025 AMF. All rights reserved.</span>
						<span className="hidden sm:inline">|</span>
						<button className="hover:text-red-600">Version</button>
						<span>·</span>
						<button className="hover:text-red-600">Support</button>
						<span>·</span>
						<button className="hover:text-red-600">
							Terms and Conditions
						</button>
						<span>·</span>
						<button className="hover:text-red-600">
							Privacy Policy
						</button>
						<span>·</span>
						<button className="hover:text-red-600">EULA</button>
						<span>·</span>
						<button className="hover:text-red-600">Manual</button>
					</div>

					{/* Language selector */}
					<div className="flex items-center gap-2">
						<span>Language</span>
						<div className="flex items-center gap-1 rounded-full border border-gray-300 px-3 py-1 bg-white text-[11px]">
							<Globe className="h-3 w-3" />
							<span>English</span>
							<span className="text-gray-400">▾</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

// src/pages/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";

// Import images from assets folder
import partsImage from "../assets/parts.jpg";
import documentationImage from "../assets/documentation.jpg";
import trainingImage from "../assets/training.jpg";
import serviceImage from "../assets/service.jpg";

const HomePage = () => {
	const navigate = useNavigate();

	const serviceCards = [
		{
			id: "parts",
			title: "PARTS",
			image: partsImage,
			path: "/parts",
		},
		{
			id: "documentation",
			title: "DOCUMENTATION",
			image: documentationImage,
			path: "/documentation",
		},
		{
			id: "training",
			title: "TRAINING",
			image: trainingImage,
			path: "/training",
		},
		{
			id: "service",
			title: "SERVICE",
			image: serviceImage,
			path: "/service",
		},
	];

	return (
		<Layout>
			<div className="min-h-screen">
				{/* HOME Title */}
				<div className="bg-white py-8">
					<h1 className="text-4xl font-bold text-center text-gray-800 tracking-wide">
						HOME
						<div className="mx-auto mt-2 h-1 w-20 bg-red-600"></div>
					</h1>
				</div>
				{/* Service Cards - 4 Cards with Images */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{serviceCards.map((card) => (
							<div
								key={card.id}
								onClick={() => navigate(card.path)}
								className="group cursor-pointer transition-all duration-300 hover:scale-105"
							>
								<div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
									{/* Card with Background Image and Icon Overlay */}
									<div className="relative h-64 bg-gray-400 overflow-hidden">
										{/* Background Image with Dark Overlay */}
										<img
											src={card.image}
											alt={card.title}
											className="absolute inset-0 w-full h-full object-cover"
										/>

										{/* Dark Overlay */}
										<div className="absolute inset-0 bg-black bg-opacity-40"></div>

										{/* White Icon Overlay */}
										<div className="absolute inset-0 flex items-center justify-center">
											<div className="opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
												{card.icon}
											</div>
										</div>
									</div>

									{/* Card Title */}
									<div className="bg-white py-4 text-center border-t-2 border-gray-200">
										<h3 className="text-xl font-bold text-gray-900 tracking-wide">
											{card.title}
										</h3>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default HomePage;

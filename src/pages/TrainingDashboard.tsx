// src/pages/TrainDashboard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";

import partsImage from "../assets/parts.jpg";
import documentationImage from "../assets/documentation.jpg";
import trainingImage from "../assets/training.jpg";
import serviceImage from "../assets/service.jpg";

const TrainDashboard = () => {
    const navigate = useNavigate();

    const cards = [
        {
            id: "premium-training",
            title: "AMFMethod\nPremium",
            lines: ["AMFMethod Premium"],
            image: documentationImage,
            path: "/documentation",
        },
        {
            id: "basic-training",
            title: "Basic\nTraining",
            lines: ["Basic Training"],
            image: trainingImage,
            path: "/documentation",
        },
    ];

    return (
        <Layout>
            <div className="min-h-screen">
                {/* Header */}
                <section className="bg-white py-6 sm:py-8">
                    <div className="max-w-6xl mx-auto px-4">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 tracking-wide">
                            TRAINING
                        </h1>
                        <div className="mx-auto mt-2 h-1 w-20 bg-red-600" />
                    </div>
                </section>

                {/* Dashboard cards */}
                <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div
                        className={`
                            grid gap-5 sm:gap-6 md:gap-8
                            ${
                                cards.length === 1
                                    ? "grid-cols-1 place-items-center max-w-xs mx-auto"
                                    : cards.length === 2
                                    ? "grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto"
                                    : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
                            }
                        `}
                    >
                        {cards.map((card) => (
                            <button
                                key={card.id}
                                type="button"
                                onClick={() => navigate(card.path)}
                                className="group flex flex-col rounded-xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 w-full"
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/3] sm:aspect-[5/4] bg-gray-200">
                                    <img
                                        src={card.image}
                                        alt={card.lines.join(" ")}
                                        className="absolute inset-0 h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors" />
                                </div>

                                {/* Bottom title */}
                                <div className="py-3 text-center">
                                    <p className="text-xs sm:text-sm font-bold uppercase tracking-wide">
                                        {card.lines.join(" ")}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default TrainDashboard;

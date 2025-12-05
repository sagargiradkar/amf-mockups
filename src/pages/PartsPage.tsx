import { Layout } from "../components/layout/Layout";
import buyAgainImg from "../assets/buy_again.jpg";
import customerCareImg from "../assets/customer_care.jpg";
import myListsImg from "../assets/my_lists.jpg";
import myMachinesImg from "../assets/mymachines.jpg";
import myRsplImg from "../assets/myrspl.jpg";
import partsImg from "../assets/parts.jpg";
import searchPartsImg from "../assets/search_parts.jpg";
import trackOrderImg from "../assets/track_order.jpg";
import { useNavigate } from "react-router-dom";

const partsCards = [
	{
		id: "search-parts",
		title: "SEARCH PARTS",
		image: searchPartsImg,
		path: "/search",
	},
	{
		id: "my-machines",
		title: "MY MACHINES",
		image: myMachinesImg,
		path: "/machines",
	},
	{ id: "rspl", title: "RSPL", image: myRsplImg, path: "/rspl" },
	{
		id: "buy-again",
		title: "BUY AGAIN",
		image: buyAgainImg,
		path: "/buy-again",
	},
	{ id: "my-lists", title: "MY LISTS", image: myListsImg, path: "/lists" },
	{
		id: "customer-care",
		title: "CUSTOMER CARE REQUESTS",
		image: customerCareImg,
		path: "/customer-care",
	},
	{
		id: "saved-for-later",
		title: "SAVED FOR LATER",
		image: partsImg,
		path: "/saved-for-later",
	},
	{
		id: "track-order",
		title: "TRACK MY ORDER",
		image: trackOrderImg,
		path: "/track-order",
	},
];

export default function PartsPage() {
	const navigate = useNavigate();
	return (
		<Layout>
			<div className="min-h-screen flex flex-col items-center">
				{/* Title */}
				<div className="py-10 w-full bg-white">
					<h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 tracking-wide">
						PARTS
						<div className="mx-auto mt-3 h-1 w-20 bg-red-600" />
					</h1>
				</div>

				{/* Cards */}
				<div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 pb-16 pt-8">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{partsCards.map((card) => (
							<button
								key={card.id}
								onClick={() => navigate(card.path)}
								className="group flex flex-col rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden"
							>
								{/* Image area with top-rounded and gradient */}
								<div className="relative h-44 sm:h-52 overflow-hidden">
									<img
										src={card.image}
										alt={card.title}
										className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
									{/* subtle dark gradient from bottom like screenshot */}
									<div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
								</div>

								{/* Label bar */}
								<div className="bg-white py-4 text-center border-t border-gray-200">
									<span className="text-sm sm:text-base font-bold tracking-wide text-gray-800 transition-colors duration-200">
										{card.title}
									</span>
								</div>
							</button>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
}

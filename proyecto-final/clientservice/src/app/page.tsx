import ScrollDownAnimation from '@components/navigation/ScrollDownAnimation';
import ScrollUpAnimation from '@components/navigation/ScrollUpAnimation';
import CategoriesSection from '@components/sections/homePage/CategoriesSection';
import ExploreSection from '@components/sections/homePage/ExploreSection';
import FAQsSection from '@components/sections/homePage/FAQsSection';
import HeroSection from '@components/sections/homePage/HeroSection';
import TestimonialSection from '@components/sections/homePage/TestimonialSection';

export default function HomePage() {
	return (
		<main className="flex flex-col w-screen gap-y-6">
			<section className="relative h-[80vh] bg-hero-background bg-cover bg-center overflow-hidden">
				<div className="absolute inset-0 pointer-events-none bg-black/60 backdrop-blur-sm" />
				<HeroSection />
			</section>

			<div className="container flex flex-col items-center justify-center w-full mx-auto mb-6 gap-y-8 ">
				<ScrollDownAnimation />

				{/* <div className="container flex flex-col items-center justify-center w-full py-6 mx-auto mb-6 "></div> */}
				<section className="bg-white border rounded-md shadow-md">
					<ExploreSection />
				</section>

				<ScrollDownAnimation distanceToReduceScroll={380} />

				<section className="bg-white border rounded-md shadow-md max-w-7xl">
					<CategoriesSection />
				</section>

				<ScrollDownAnimation distanceToReduceScroll={220} />

				<section className="bg-white border rounded-md shadow-md">
					<FAQsSection />
				</section>

				<ScrollDownAnimation distanceToReduceScroll={200} />

				<section className="bg-white border rounded-md shadow-md max-w-7xl">
					<TestimonialSection />
				</section>

				<ScrollUpAnimation />
			</div>
		</main>
	);
}

import FAQsSection from '@components/sections/homePage/FAQsSection';
import CategoriesSection from '@components/sections/homePage/CategoriesSection';
import ExploreSection from '@components/sections/homePage/ExploreSection';
import HeroSection from '@components/sections/homePage/HeroSection';
import ScrollDownAnimation from '@components/sections/homePage/ScrollDownAnimation';
import TestimonialSection from '@components/sections/homePage/TestimonialSection';

export default function HomePage() {
	return (
		<main className="flex flex-col w-screen gap-y-6">
			<section className="relative h-[80vh] bg-hero-background bg-cover bg-center overflow-hidden">
				<div className="absolute inset-0 pointer-events-none bg-black/60 backdrop-blur-sm" />
				<HeroSection />
			</section>

			<div className="container flex flex-col items-center justify-center w-full mx-auto ">
				<ScrollDownAnimation />

				<section>
					<ExploreSection />
				</section>

				<section>
					<CategoriesSection />
				</section>

				<section>
					<FAQsSection />
				</section>

				<section>
					<TestimonialSection />
				</section>
			</div>
		</main>
	);
}

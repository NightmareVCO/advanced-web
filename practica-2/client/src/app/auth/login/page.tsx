import LogInForm from '@components/Forms/LogInForm/LogInForm';
import Testimonials from '@components/Testimonials/Testimonials';
import { Spacer } from '@heroui/react';

export default function Component() {
	return (
		<div className="flex h-[calc(100dvh-60px)] flex-col w-full items-center justify-center overflow-hidden rounded-small p-2 sm:p-4 lg:p-8">
			<Testimonials positions={['bottom', 'left']}>
				¡Un cambio de juego! 🚀 Esta app hace que probar APIs sea rápido y sin
				complicaciones. Simula respuestas al instante, sin depender de
				servidores. ¡Simple, potente y esencial!
			</Testimonials>

			<div className="bg-black/30 rounded-3xl p-4 w-full max-w-lg lg:mb-40">
				<h2 className="text-2xl text-center font-medium">Log In</h2>
				<Spacer y={2} />
				<LogInForm />
			</div>
		</div>
	);
}

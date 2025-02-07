import LogInForm from '@components/Forms/LogInForm/LogInForm';
import Testimonials from '@components/Testimonials/Testimonials';

export default function Component() {
	return (
		<div
			className="flex h-[calc(100dvh-60px)] flex-col w-full items-center justify-center overflow-hidden rounded-small bg-content1 p-2 sm:p-4 lg:p-8"
			style={{
				backgroundImage:
					'url(https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/black-background-texture.jpeg)',
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<Testimonials positions={['bottom', 'left']}>
				¡Un cambio de juego! 🚀 Esta app hace que probar APIs sea rápido y sin
				complicaciones. Simula respuestas al instante, sin depender de
				servidores. ¡Simple, potente y esencial!
			</Testimonials>

			<LogInForm />
		</div>
	);
}

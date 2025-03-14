import { Button, Link } from '@heroui/react';
import { Icon } from '@iconify/react';
import MainVector from '@src/components/SVG/MainVector';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';

export default function MainSection() {
	return (
		<LazyMotion features={domAnimation}>
			<m.div
				animate="kick"
				className="flex flex-col gap-6"
				exit="auto"
				initial="auto"
				transition={{
					duration: 0.25,
					ease: 'easeInOut',
				}}
				variants={{
					auto: { width: 'auto' },
					kick: { width: 'auto' },
				}}
			>
				<AnimatePresence mode="wait">
					<m.div
						animate={{ filter: 'blur(0px)', opacity: 1, x: 0 }}
						className="text-start text-[clamp(40px,10vw,44px)] font-bold leading-[1.2] tracking-tighter sm:text-[64px]"
						initial={{ filter: 'blur(16px)', opacity: 0, x: 15 + 1 * 2 }}
						transition={{
							bounce: 0,
							delay: 0.01 * 10,
							duration: 0.8 + 0.1 * 8,
							type: 'spring',
						}}
					>
						<div className="text-transparent bg-hero-section-title bg-clip-text">
							Reserva tu espacio <br /> de manera fácil y rápida.
						</div>
					</m.div>

					<m.div
						animate={{ filter: 'blur(0px)', opacity: 1, x: 0 }}
						className="text-start font-normal leading-7 text-default-500 sm:w-[466px] sm:text-[18px]"
						initial={{ filter: 'blur(16px)', opacity: 0, x: 15 + 1 * 3 }}
						transition={{
							bounce: 0,
							delay: 0.01 * 30,
							duration: 0.8 + 0.1 * 9,
							type: 'spring',
						}}
					>
						LabReservations te permite gestionar el acceso a los laboratorios universitarios.
						Registra tu solicitud y consulta tus reservas de forma sencilla.
					</m.div>

					<m.div
						animate={{ filter: 'blur(0px)', opacity: 1, x: 0 }}
						className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
						initial={{ filter: 'blur(16px)', opacity: 0, x: 15 + 1 * 4 }}
						transition={{
							bounce: 0,
							delay: 0.01 * 50,
							duration: 0.8 + 0.1 * 10,
							type: 'spring',
						}}
					>
						<Button
							as={Link}
							href="/reservas?crear"
							className="h-10 w-[163px] bg-main-color px-[16px] py-[10px] text-small font-medium leading-5 text-white"
							radius="full"
						>
							Reservar
						</Button>
						<Button
							as={Link}
							href="/reservas?consultar"
							className="h-10 w-[163px] border-1 border-default-100 px-[16px] py-[10px] text-small font-medium leading-5 bg-white"
							endContent={
								<span className="pointer-events-none flex h-[22px] w-[22px] items-center justify-center rounded-full bg-default-100">
									<Icon
										className="text-main-color [&>path]:stroke-[1.5]"
										icon="solar:arrow-right-linear"
										width={16}
									/>
								</span>
							}
							radius="full"
							variant="bordered"
						>
							Reservaciones
						</Button>
					</m.div>
				</AnimatePresence>
			</m.div>

			<AnimatePresence mode="wait">
				<m.div
					animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
					className="absolute top-[25%] left-[47%] w-full"
					initial={{ filter: 'blur(16px)', opacity: 0, y: 300 }}
					transition={{
						bounce: 0,
						delay: 0.01 * 10,
						duration: 0.8 + 0.1 * 13,
						type: 'spring',
					}}
				>
					<MainVector />
				</m.div>
			</AnimatePresence>
		</LazyMotion>
	);
}

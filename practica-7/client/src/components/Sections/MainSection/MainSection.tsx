import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
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
						{/* 
                    NOTE: To use `bg-hero-section-title`, you need to add the following to your tailwind config.
                    ```
                    backgroundImage: {
                      "hero-section-title":
                        "linear-gradient(91deg, #FFF 32.88%, rgba(255, 255, 255, 0.40) 99.12%)",
                    },
                    ```
                  */}
						<div className="bg-hero-section-title bg-clip-text text-transparent dark:from-[#FFFFFF] dark:to-[#FFFFFF66]">
							Reserva tu espacio  <br /> de manera fácil y rápida.
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
							className="h-10 w-[163px] bg-default-foreground px-[16px] py-[10px] text-small font-medium leading-5 text-background"
							radius="full"
						>
							Reservar
						</Button>
						<Button
							className="h-10 w-[163px] border-1 border-default-100 px-[16px] py-[10px] text-small font-medium leading-5"
							endContent={
								<span className="pointer-events-none flex h-[22px] w-[22px] items-center justify-center rounded-full bg-default-100">
									<Icon
										className="text-default-500 [&>path]:stroke-[1.5]"
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
		</LazyMotion>
	);
}

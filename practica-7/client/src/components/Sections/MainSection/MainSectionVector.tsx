import MainVector from '@src/components/SVG/MainVector';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';

export default function MainSectionVector() {
	return (
		<LazyMotion features={domAnimation}>
			<AnimatePresence mode="wait">
				<m.div
					animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
					className="absolute top-[10%] w-full"
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

type Position = 'top' | 'bottom' | 'left' | 'right';

type TestimonialsProps = {
	positions: Position[];
	children: React.ReactNode;
	justify?: 'start' | 'end' | 'center';
};

const getPosition = (positions: Position[]) => {
	let className = '';
	for (const position of positions) {
		className += ` ${position}-10`;
	}

	return className;
};

export default function Testimonials({
	positions,
	children,
	justify = 'start',
}: TestimonialsProps) {
	const className = getPosition(positions);
	const justifyClass = `text-${justify}`;

	return (
		<div className={`absolute ${className} hidden md:block`}>
			<p className={`max-w-xl text-white/60 ${justifyClass} `}>
				<span className="font-medium">“</span>
				{children}
				<span className="font-medium">”</span>
			</p>
		</div>
	);
}

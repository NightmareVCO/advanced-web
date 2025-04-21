import Slider from '@components/slider/Slider';
import { slides } from '@lib/data/slider.data';

export default function HeaderSection() {
	return (
		<div>
			<Slider slides={slides} />
		</div>
	);
}

import {
	Button,
	Divider,
	Link,
	NavbarMenu,
	NavbarMenuItem,
} from '@heroui/react';

import { mobileMenuItems } from '../_config/config';
import NavbarMobileItems from './NavbarMobileItems';

export default function NavbarMobile() {
	return (
		<NavbarMenu
			className="top-[calc(var(--navbar-height)_-_1px)] max-h-fit bg-default-200/50 pb-6 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
			motionProps={{
				initial: { opacity: 0, y: -20 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: -20 },
				transition: {
					ease: 'easeInOut',
					duration: 0.2,
				},
			}}
		>
			<NavbarMenuItem>
				<Button fullWidth as={Link} href="/#" variant="faded">
					Sign In
				</Button>
			</NavbarMenuItem>
			<NavbarMenuItem className="mb-4">
				<Button
					fullWidth
					as={Link}
					className="bg-foreground text-background"
					href="/#"
				>
					Get Started
				</Button>
			</NavbarMenuItem>

			<NavbarMobileItems mobileMenuItems={mobileMenuItems} />
		</NavbarMenu>
	);
}

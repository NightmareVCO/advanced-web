import {
	Button,
	Divider,
	Link,
	NavbarMenu,
	NavbarMenuItem,
} from '@heroui/react';

import { mobileMenuItems } from '../_config/config';
import NavbarMobileItems from './NavbarMobileItems';

import { Icon } from '@iconify/react';
import Routes from '@/lib/data/routes.data';

type NavbarMobileProps = {
	admin?: boolean;
	isAuthenticated?: boolean;
};

export default function NavbarMobile({
	admin,
	isAuthenticated,
}: NavbarMobileProps) {
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
				<Button
					className="bg-primary font-medium text-white"
					color="secondary"
					fullWidth
					radius="full"
					variant="flat"
					as={Link}
					href={Routes.LogIn}
				>
					Login
				</Button>
			</NavbarMenuItem>
			<NavbarMenuItem className="mb-4">
				<Button
					fullWidth
					className="bg-primary font-medium text-white"
					color="secondary"
					endContent={<Icon icon="solar:alt-arrow-right-linear" />}
					radius="full"
					variant="flat"
					as={Link}
					href={Routes.NewProject}
				>
					Create New Project
				</Button>
			</NavbarMenuItem>

			<NavbarMobileItems mobileMenuItems={mobileMenuItems} />
		</NavbarMenu>
	);
}

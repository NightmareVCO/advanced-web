import { logout } from '@lib/actions/logIn.action';

export default async function LogOut() {
	await logout();
}

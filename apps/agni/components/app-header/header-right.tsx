'use client';

import { useSelector } from 'react-redux';
import { ShoppingCart } from 'lucide-react';

import { LoginSheet } from '../login/ui';
import { RootState } from '../../store';
import AuthDropdown from './dropdown';

export default function HeaderRight() {
	const auth = useSelector((state: RootState) => state.auth);
	return (
		<div className="flex gap-24">
			<div className="flex items-center gap-8 cursor-pointer">
				<ShoppingCart width={20} height={20} />
				<span className="text-14 font-medium">Cart</span>
			</div>
			{auth.loggedIn ? <AuthDropdown /> : <LoginSheet />}
		</div>
	);
}

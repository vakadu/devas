'use client';

import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useEffect } from 'react';

import useOtpHook from './use-otp-hook';
import { Routes } from '../../../../core/primitives/routes';
import { closeModal, openModal } from '../../../../core/store/layout-reducer';
import { authenticateUser } from '../../../../core/store/auth';
import { useAppDispatch } from '../../../../core/store';

export default function Page() {
	const params = useParams();
	const dispatch = useAppDispatch();
	const router = useRouter();
	const {
		otp,
		otpRefs,
		handleClick,
		handleKeyDown,
		handleOtpChange,
		handleBack,
		isExecuting,
		result,
	} = useOtpHook({
		mobile: params?.mobileNumber as string,
	});

	useEffect(() => {
		if (isExecuting) {
			dispatch(openModal({ view: 'LOADING', loadingText: 'Setting up user...' }));
		} else {
			dispatch(closeModal());
		}
	}, [dispatch, isExecuting]);

	useEffect(() => {
		if (!result.data) {
			return;
		}

		if (result.data.status === 'SUCCESS') {
			dispatch(
				authenticateUser({
					accessToken: result.data.data?.accessToken as string,
					refreshToken: result.data.data?.refreshToken as string,
				})
			);
			router.push(Routes.Home);
		} else {
			toast.error(result.data.msg);
		}
	}, [dispatch, result, result.data, router]);

	return (
		<div>
			<div onClick={handleBack} className="flex items-center gap-12">
				<div className="w-32 h-32 flex justify-center items-center cursor-pointer">
					<ArrowLeft width={24} height={24} />
				</div>
				<span className="text-[32px] leading-[42px] font-semibold text-left">
					Enter 6 digit OTP code
				</span>
			</div>
			<div className="text-14 text-grey-text3 my-12">
				OTP sent to{' '}
				<span className="font-medium text-black-1">+91-{params?.mobileNumber}</span>
			</div>
			<div className="flex gap-12 mt-24">
				{otp.map((_, i) => {
					return (
						<input
							key={i}
							ref={(input) => (otpRefs.current[i] = input) as any}
							className="leading-16 h-[52px] w-[52px] px-12 transition duration-300 ease-in-out border focus:ring-2  focus:shadow-sm outline-none focus:border-none
   focus:outline-none focus:ring-opacity-90 rounded-8 focus:ring-brand border-grey-divider text-center text-24 font-medium"
							onChange={(e) => handleOtpChange(e, i)}
							onKeyDown={(e) => handleKeyDown(e, i)}
							value={(otpRefs.current[i]?.value as string) || ''}
							onClick={(e) => handleClick(e, i)}
							maxLength={1}
						/>
					);
				})}
			</div>
		</div>
	);
}

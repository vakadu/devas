import { useEffect, useState } from 'react';

export const useResize = () => {
	const [isDesktop, setDesktop] = useState(true);

	const handleResize = () => {
		setDesktop(window.innerWidth > 1024);
	};

	useEffect(() => {
		handleResize();

		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return {
		isDesktop,
	};
};

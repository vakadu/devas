import { ImagePlaceholder } from '../image';

export function Spinner() {
	return (
		<div className="relative w-[42px] h-[42px] flex justify-center items-center bg-white rounded-full shadow-base mx-auto">
			<ImagePlaceholder
				src="/images/icon.png"
				containerClasses="h-[32px] w-[32px] rounded-full"
				imageClasses="object-contain"
			/>
			<div className="absolute inset-0 rounded-full border-[3px] border-t-brand border-transparent animate-spin"></div>
		</div>
	);
}

export default Spinner;

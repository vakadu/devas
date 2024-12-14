import { ImagePlaceholder } from '../image';

export function Spinner() {
	return (
		<div className="relative w-[54px] h-[54px] flex justify-center items-center bg-white rounded-full shadow-base mx-auto">
			<ImagePlaceholder
				src="/images/icon.png"
				containerClasses="h-[42px] w-[42px] rounded-full"
				imageClasses="object-contain"
			/>
			<div className="absolute inset-0 rounded-full border-[3px] border-t-brand border-transparent animate-spin"></div>
		</div>
	);
}

export default Spinner;

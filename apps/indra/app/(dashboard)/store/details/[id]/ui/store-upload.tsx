import { useEffect, useMemo, useState } from 'react';

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	DropZone,
	ImagePlaceholder,
	Input,
} from '@devas/ui';
import { useGetStoreDocs } from '../api/get-store-docs';
import { useUploadStoreDocs } from '../api/upload-store-docs';
import { createFormDataForImage } from '../../../../../../core/helpers';

export default function StoreUpload({
	storeType,
	stroreId,
	value,
}: {
	storeType: { label: string; value?: string };
	stroreId: string;
	value: string;
}) {
	const { data } = useGetStoreDocs(
		stroreId,
		storeType.label,
		storeType.value,
		storeType.label === value
	);
	const [files, setFiles] = useState<ICommonTypes.IFileWithPreview[]>([]);
	const { mutateAsync: uploadStoreDocs } = useUploadStoreDocs(stroreId);
	console.log(files);

	// useEffect(() => {
	// 	if (data && data?.data?.docUrl) {
	// 		setFiles([
	// 			{
	// 				preview: data?.data?.docUrl,
	// 			} as ICommonTypes.IFileWithPreview,
	// 		]);
	// 	}
	// }, [data]);

	const renderTitle = useMemo(() => {
		const titleMap: Record<string, string> = {
			LOGO: 'Store Logo',
			GST: 'GST Document',
			PAN: 'PAN Document',
			OTHER: 'Other Documents',
		};
		return titleMap[storeType.label];
	}, [storeType.label]);

	const onSubmit = async () => {
		// const formData = createFormDataForImage(files[0] as File, 'file', {
		// 	imageType: values.type,
		// 	productImageId: imageId,
		// });
		// const response = await uploadStoreDocs();
	};

	return (
		<AccordionItem className="px-12" value={storeType.label}>
			<AccordionTrigger>{renderTitle}</AccordionTrigger>
			<AccordionContent>
				<div className="grid grid-cols-2 gap-24">
					{data?.data?.docUrl && (
						<div className="col-span-1 border border-grey-divider rounded-12">
							<ImagePlaceholder
								src={data?.data?.docUrl}
								containerClasses="w-full h-[300px]"
								imageClasses="rounded-12 object-contain"
							/>
						</div>
					)}
					<div className="col-span-1">
						<Input type="file" />
						{/* <DropZone
							acceptTypes={{
								'image/*': [],
								'application/pdf': [],
							}}
							files={files}
							setFiles={setFiles}
							onSubmit={onSubmit}
						/> */}
					</div>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
}

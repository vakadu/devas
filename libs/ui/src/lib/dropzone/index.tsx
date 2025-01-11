'use client';

import { CloudUpload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';

import { ImagePlaceholder } from '../image';

type IFileWithPreview = File & { preview: string };

interface IProps {
	files: IFileWithPreview[];
	setFiles: (files: IFileWithPreview[]) => void;
}

export const DropZone = ({ files, setFiles }: IProps) => {
	const { getRootProps, getInputProps, isDragAccept } = useDropzone({
		accept: {
			'image/*': [],
		},
		maxFiles: 1,
		onDrop: (acceptedFiles) => {
			setFiles(
				acceptedFiles.map((file) =>
					Object.assign(file, {
						preview: URL.createObjectURL(file),
					})
				)
			);
		},
	});

	return (
		<div>
			<div className="w-full text-center border-dashed border border-grey-divider rounded-12 py-16 flex flex-col justify-center items-center h-[300px] ">
				{files.length === 0 && (
					<div
						{...getRootProps({
							className:
								'dropzone flex flex-col gap-12 justify-center items-center w-full h-full cursor-pointer',
						})}
					>
						<input className="hidden" {...getInputProps()} />
						<CloudUpload className="size-54 text-grey-text3" />
						{isDragAccept ? (
							<p className="text-14  text-grey-text3">Drop the files here ...</p>
						) : (
							<p className="text-14  text-grey-text3">
								Drop files here or click to upload.
							</p>
						)}
					</div>
				)}
				<div className="flex justify-center items-center w-full">
					{files.map((file, i) => (
						<ImagePlaceholder
							key={i}
							src={file.preview}
							containerClasses="h-[290px] w-full"
							imageClasses="object-cover rounded-12"
						/>
					))}
				</div>
			</div>
		</div>
	);
};

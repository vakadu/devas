import { useState, ChangeEvent } from 'react';

import {
	Button,
	ImagePlaceholder,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@devas/ui';

export default function UploadImageForm() {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [value, setValue] = useState<string | null>(null);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0] || null;
		setSelectedFile(file);
	};

	const onSubmit = () => {};

	return (
		<div className="flex flex-col gap-12">
			<Select value={value || ''} onValueChange={setValue}>
				<SelectTrigger>
					<SelectValue placeholder="Choose Priority" />
				</SelectTrigger>
				<SelectContent>
					{Array.from({ length: 6 }, (_, index) => {
						return (
							<SelectItem value={`${index + 1}`} key={index}>
								{index + 1}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
			<div className="flex flex-col gap-12">
				<Input type="file" onChange={(e) => handleFileChange(e)} />
				{selectedFile && (
					<ImagePlaceholder
						src={selectedFile ? URL.createObjectURL(selectedFile) : ''}
						containerClasses="w-[200px] h-[200px]"
						imageClasses="object-cover rounded-12"
						alt={selectedFile?.name}
					/>
				)}
			</div>
			<Button disabled={!selectedFile || !value}>Submit</Button>
		</div>
	);
}

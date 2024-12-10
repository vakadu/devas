'use client';

import {
	Button,
	FloatingInput,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@devas/ui';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Index() {
	const [value, setValue] = useState('');

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const response = await fetch('/api/scrape', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ category: value }),
			});

			const data = await response.json();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="container mt-54 ">
			<form className="flex gap-12">
				<div className="flex-1">
					<FloatingInput
						label="Search for category"
						id="category"
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
				</div>
				<Button
					type="submit"
					onClick={handleSubmit}
					disabled={value === ''}
					size="lg"
					className="h-[48px] w-[250px]"
				>
					Search
				</Button>
			</form>
		</div>
	);
}

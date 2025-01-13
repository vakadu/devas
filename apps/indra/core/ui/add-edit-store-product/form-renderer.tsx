import {
	FormField,
	FormItem,
	FormControl,
	FormMessage,
	FloatingInput,
	FloatingTextArea,
} from '@devas/ui';

export function FormFieldRenderer({
	field,
	form,
}: {
	field: {
		name: string;
		label: string;
		type: string;
		keyboardType: string;
	};
	form: any;
}) {
	if (field.type === 'textfield') {
		return (
			<FormField
				key={field.name}
				control={form.control}
				name={field.name}
				render={({ field: inputField, fieldState }) => (
					<FormItem className="relative col-span-2">
						<FormControl>
							<FloatingTextArea
								label={field.label}
								id={field.name}
								isError={!!fieldState.error}
								{...inputField}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		);
	}

	return (
		<FormField
			key={field.name}
			control={form.control}
			name={field.name}
			render={({ field: inputField, fieldState }) => (
				<FormItem className="relative">
					<FormControl>
						<FloatingInput
							label={field.label}
							id={field.name}
							isError={!!fieldState.error}
							{...inputField}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}

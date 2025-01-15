import {
	FloatingInput,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@devas/ui';

type IFormData = {
	title: string;
	description: string;
	xPriority: string;
	yPriority: string;
	active: string;
};

export const FieldRenderer = ({ fields, form }: { fields: any[]; form: any }) => {
	return (
		<div className="grid grid-cols-2 gap-x-24 gap-y-24 mx-auto w-full max-w-screen-xl">
			{fields.map(({ name, label, type, options }) => {
				switch (type) {
					case 'select':
						return (
							<FormField
								key={name}
								control={form.control}
								name={name as keyof IFormData}
								render={({ field: selectField, fieldState }) => (
									<FormItem>
										<FormLabel>{label}</FormLabel>
										<Select
											onValueChange={selectField.onChange}
											value={selectField.value}
										>
											<FormControl>
												<SelectTrigger
													isError={!!fieldState.error}
													className="!mt-6 bg-white"
												>
													<SelectValue placeholder={`Select ${label}`} />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{options?.map(
													(option: { value: string; label: string }) => (
														<SelectItem
															key={option.value}
															value={option.value}
														>
															{option.label}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						);
					default:
						return (
							<FormField
								key={name}
								control={form.control}
								name={name as keyof IFormData}
								render={({ field, fieldState }) => (
									<FormItem>
										<FormControl>
											<FloatingInput
												label={label}
												id={name}
												isError={!!fieldState.error}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						);
				}
			})}
		</div>
	);
};

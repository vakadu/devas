import { X } from 'lucide-react';

import {
	Button,
	FloatingInput,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	SearchSelectLabel,
	SearchSelectList,
	SearchSelectTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@devas/ui';
import { SearchSelectProducts } from '../../../../../../../core/ui';

type IFormData = {
	title: string;
	description: string;
	xPriority: string;
	yPriority: string;
	active: string;
};

export const FieldRenderer = ({
	fields,
	form,
	products,
	handleProduct,
	handleDelete,
}: {
	fields: any[];
	form: any;
	products: ICatalougeTypes.IProduct[];
	handleProduct: (product: ICatalougeTypes.IProduct) => void;
	handleDelete: (id: string) => void;
}) => {
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
					case 'selectList':
						return (
							<div key={name}>
								<SearchSelectList>
									<SearchSelectLabel>Select Products</SearchSelectLabel>
									<SearchSelectTrigger>
										{products.length > 0 ? (
											<span className="text-ellipsis overflow-hidden">
												{products
													.map((product) => product.title)
													.join(', ')}
											</span>
										) : (
											'Add Products'
										)}
									</SearchSelectTrigger>
									<SearchSelectProducts
										products={products}
										handleProduct={handleProduct}
									/>
								</SearchSelectList>
								{products.length > 0 && (
									<div className="flex flex-wrap gap-12 mt-12">
										{products.map((product) => (
											<div
												key={product._id}
												className="flex justify-between items-center max-w-[120px] border border-grey-3 px-12 py-6 rounded-full gap-12"
											>
												<span className="text-12 flex-1">
													{product.title}
												</span>
												<Button
													className="w-16 h-16"
													variant="ghost"
													size="icon"
													onClick={() => handleDelete(product._id)}
												>
													<X className="!size-16" />
												</Button>
											</div>
										))}
									</div>
								)}
							</div>
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

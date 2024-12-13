import Link from 'next/link';

import { AspectRatio, ImagePlaceholder } from '@devas/ui';
import { capitalize } from '@devas/utils';

const CategoryCard = ({
	id,
	displayName,
	image,
}: {
	id: string;
	displayName: string;
	image: string;
}) => {
	return (
		<Link
			className="w-[92px] flex flex-col items-center gap-12"
			href={`/categories/${id}`}
			key={id}
		>
			<AspectRatio ratio={1 / 1}>
				<ImagePlaceholder src={image} containerClasses="h-[92px] w-[92px]" />
			</AspectRatio>
			<p className="text-14 font-medium text-center leading-16">{capitalize(displayName)}</p>
		</Link>
	);
};

export default async function Categories() {
	const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_INVENTORY_PATH}/categories`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		return null;
	}

	const data =
		((await response.json()) as ICommonTypes.IApiResponse<ICategoryTypes.ICategoryItem[]>) ||
		{};

	const categories = data?.data || [];

	if (!data) {
		return null;
	}

	return (
		<div className="container my-24">
			<div className="mb-16">
				<h4 className="text-18 font-medium">Categories</h4>
			</div>
			<div className="flex flex-wrap gap-24">
				{categories.flatMap((category) =>
					category?.subCateogry?.length
						? category.subCateogry.map((subCat) => (
								<CategoryCard
									key={subCat.id}
									id={subCat.id}
									displayName={subCat.displayName}
									image={category.image}
								/>
						  ))
						: [
								<CategoryCard
									key={category.id}
									id={category.id}
									displayName={category.displayName}
									image={category.image}
								/>,
						  ]
				)}
			</div>
		</div>
	);
}

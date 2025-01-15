// export function StoreProductsListing({
// 	children,
// 	storeId,
// }: {
// 	children: ReactNode;
// 	storeId: string;
// }) {
// 	const { ref, inView } = useInView({
// 		threshold: 0,
// 	});
// 	const [search, setSearchTerm] = useState('');
// 	const { data, fetchNextPage, isFetchingNextPage, isFetching, refetch } =
// 		useGetStoreProductsList(search, 15, storeId);
// 	const [rowSelection, setRowSelection] = useState({});

// 	useEffect(() => {
// 		if (inView) {
// 			fetchNextPage();
// 		}
// 	}, [fetchNextPage, inView]);

// 	const handleSearchChange = useCallback((value: string) => {
// 		setSearchTerm(value);
// 	}, []);

// 	const value = useMemo(
// 		() => ({
// 			value: search,
// 			handleSearchChange,
// 			data: data?.pages.flatMap((page) => page?.data?.data?.storeProducts) || [],
// 			isFetching,
// 			rowSelection,
// 			setRowSelection,
// 			refetch,
// 		}),
// 		[search, handleSearchChange, data?.pages, isFetching, rowSelection, refetch]
// 	);

// 	return (
// 		<ListingContext.Provider value={value as any}>
// 			<div>{children}</div>
// 			<div className="text-center flex flex-col gap-6" ref={ref}>
// 				{isFetchingNextPage && (
// 					<>
// 						<Spinner />
// 						<span className="text-12 font-medium">Fetching more products...</span>
// 					</>
// 				)}
// 			</div>
// 		</ListingContext.Provider>
// 	);
// }

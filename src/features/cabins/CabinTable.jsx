import { useSearchParams } from "react-router-dom";

import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import CabinItem from "./CabinItem";
import { useCabins } from "./useCabin";
import EmptyBox from "../../ui/EmptyBox";

function CabinTable() {
	const { isLoading, error, cabinData } = useCabins();
	const [searchParams] = useSearchParams();

	const cabins = Array.isArray(cabinData) ? cabinData : [];

	if (!cabins.length) return <EmptyBox resourceName="cabins" />;

	if (isLoading) return <Spinner />;

	if (error) {
		return <div>Error loading cabins: {error.message}</div>;
	}

	// 1) Filtering the Cabins
	const filteredValue = searchParams.get("discount") || "all";

	let filteredCabins = cabins;

	if (filteredValue === "no-discount") {
		filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
	}
	if (filteredValue === "with-discount") {
		filteredCabins = cabins.filter((cabin) => cabin.discount > 0);
	}

	// 2) Sorting the Cabins
	const sortBy = searchParams.get("sortBy") || "";
	const [field, direction] = sortBy.split("-");
	const sortedCabins = [...filteredCabins].sort((a, b) => {
		if (direction === "asc") {
			return a[field] - b[field];
		}
		return b[field] - a[field];
	});

	return (
		<Table role="table" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
			<Table.Header role="row">
				<div>Image</div>
				<div>Cabin</div>
				<div>Capacity</div>
				<div>Price</div>
				<div>Discount</div>
				<div>Action</div>
			</Table.Header>
			<Table.Body
				data={sortedCabins}
				render={(cabin) => <CabinItem key={cabin.id} cabin={cabin} />}
			/>
		</Table>
	);
}

export default CabinTable;

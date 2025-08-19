import Table from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import CabinItem from "./CabinItem";
import { useCabins } from "./useCabin";

function CabinTable() {
	const { isLoading, error, cabinData } = useCabins();

	if (isLoading) return <Spinner />;
	if (error) {
		return <div>Error loading cabins: {error.message}</div>;
	}

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
				data={cabinData}
				render={(cabin) => <CabinItem key={cabin.id} cabin={cabin} />}
			/>
		</Table>
	);
}

export default CabinTable;

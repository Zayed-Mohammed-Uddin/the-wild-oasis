import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import { StyledTable, StyledHeader } from "../../ui/Table";
import Spinner from "../../ui/Spinner";
import CabinItem from "./CabinItem";

function CabinTable() {
	const {
		isLoading,
		error,
		data: cabinData,
	} = useQuery({
		queryKey: ["cabins"],
		queryFn: getCabins,
	});

	if (isLoading) return <Spinner />;
	if (error) {
		return <div>Error loading cabins: {error.message}</div>;
	}

	return (
		<StyledTable role="table">
			<StyledHeader role="row" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<div>Image</div>
				<div>Cabin</div>
				<div>Capacity</div>
				<div>Price</div>
				<div>Discount</div>
				<div>Action</div>
			</StyledHeader>
			{cabinData.map((cabin) => (
				<CabinItem key={cabin.id} cabin={cabin} />
			))}
		</StyledTable>
	);
}

export default CabinTable;

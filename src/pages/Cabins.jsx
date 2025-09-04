import CabinTable from "../features/cabins/CabinTable";
import Header from "../ui/Heading";
import Row from "../ui/Row";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

function Cabins() {
	return (
		<>
			<Row $type="horizontal">
				<Header as="h1">All cabins</Header>
				<CabinTableOperations />
			</Row>

			<Row>
				<CabinTable />
				<AddCabin />
			</Row>
		</>
	);
}

export default Cabins;

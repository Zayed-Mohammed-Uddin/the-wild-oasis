import CabinTable from "../features/cabins/CabinTable";
import Header from "../ui/Heading";
import Row from "../ui/Row";
import AddCabin from "../features/cabins/AddCabin";

function Cabins() {
	return (
		<>
			<Row type="horizontal">
				<Header as="h1">All cabins</Header>
				<p>Filter / Sort</p>
			</Row>

			<Row>
				<CabinTable />
				<AddCabin />
			</Row>
		</>
	);
}

export default Cabins;

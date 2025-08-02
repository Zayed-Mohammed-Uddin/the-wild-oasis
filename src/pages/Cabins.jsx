import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import Header from "../ui/Heading";
import Row from "../ui/Row";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
	const [showForm, setShowForm] = useState(false);
	return (
		<>
			<Row type="horizontal">
				<Header as="h1">All cabins</Header>
				<p>Filter / Sort</p>
			</Row>

			<Row>
				<CabinTable />
				<Button onClick={() => setShowForm((show) => !show)}>
					Add New Cabin
				</Button>

				{showForm && <CreateCabinForm />}
			</Row>
		</>
	);
}

export default Cabins;

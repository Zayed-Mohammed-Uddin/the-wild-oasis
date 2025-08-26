import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Header from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
	return (
		<>
			<Row type="horizontal">
				<Header as="h1">All bookings</Header>
				<BookingTableOperations />
			</Row>

			<Row>
				<BookingTable />
			</Row>
		</>
	);
}

export default Bookings;

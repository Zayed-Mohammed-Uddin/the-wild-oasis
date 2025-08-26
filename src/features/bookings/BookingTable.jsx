import { useBookings } from "./useBookings";
import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import EmptyBox from "../../ui/EmptyBox";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function BookingTable() {
	const { bookingsData, isLoading, error, count } = useBookings();

	if (isLoading) return <Spinner />;
	if (!bookingsData.length) return <EmptyBox resourceName="bookings" />;
	if (error) {
		return <div>Error loading bookings: {error.message}</div>;
	}

	return (
		<Menus>
			<Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 2.2rem">
				<Table.Header>
					<div>Cabin</div>
					<div>Guest</div>
					<div>Dates</div>
					<div>Status</div>
					<div>Amount</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={bookingsData}
					render={(booking) => (
						<BookingRow key={booking.id} booking={booking} />
					)}
				/>

				<Table.Footer>
					<Pagination totalResults={count} />
				</Table.Footer>
			</Table>
		</Menus>
	);
}

export default BookingTable;

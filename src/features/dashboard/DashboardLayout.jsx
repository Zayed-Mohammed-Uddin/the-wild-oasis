import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabin";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-template-rows: auto 34rem auto;
	gap: 2.4rem;

	/* Tablet styles */
	@media (max-width: 768px) {
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto 34rem auto;
		gap: 2rem;
	}

	/* Mobile styles */
	@media (max-width: 480px) {
		grid-template-columns: 1fr;
		grid-template-rows: repeat(auto, 4) 34rem auto;
		gap: 1.6rem;
	}
`;

function DashboardLayout() {
	const { bookings, isLoading: isRecentBookingsLoading } =
		useRecentBookings();
	const {
		isLoading: isRecentStaysLoading,
		confirmedStays,
		numDays,
	} = useRecentStays();

	const { cabinData, isLoading: isCabinsLoading } = useCabins();

	if (isRecentBookingsLoading || isRecentStaysLoading || isCabinsLoading)
		return <Spinner />;

	return (
		<StyledDashboardLayout>
			<Stats
				bookings={bookings}
				confirmedStays={confirmedStays}
				numDays={numDays}
				cabinCount={cabinData.length}
			/>
			<TodayActivity />
			<DurationChart confirmedStays={confirmedStays} />
			<SalesChart bookings={bookings} numDays={numDays} />
		</StyledDashboardLayout>
	);
}

export default DashboardLayout;

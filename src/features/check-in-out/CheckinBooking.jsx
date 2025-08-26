import styled from "styled-components";
import { useEffect, useState } from "react";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import BookingDataBox from "../../features/bookings/BookingDataBox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useBooking } from "../bookings/useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.4rem 4rem;
`;

function CheckinBooking() {
	const moveBack = useMoveBack();
	const { bookingData, isLoading } = useBooking();
	const { settings, isLoading: isSettingsLoading } = useSettings();

	const [confirmPaid, setConfirmPaid] = useState(false);
	const [addBreakfast, setAddBreakfast] = useState(false);

	const {
		id: bookingID,
		guests,
		totalPrice,
		numNights,
		numGuests,
		hasBreakfast,
	} = bookingData || {};

	const { checkin, isCheckIn } = useCheckin();

	useEffect(
		() => setConfirmPaid(bookingData?.isPaid ?? false),
		[bookingData]
	);

	if (!bookingData) return null;
	if (isLoading || isSettingsLoading) return <Spinner />;

	const optionalBreakfastPrice =
		settings?.breakfastPrice * numNights * numGuests;

	function handleCheckin() {
		if (!confirmPaid) return;

		if (addBreakfast) {
			checkin({
				bookingID,
				breakfast: {
					hasBreakfast: true,
					extrasPrice: optionalBreakfastPrice,
					totalPrice: totalPrice + optionalBreakfastPrice,
				},
			});
		} else {
			checkin({ bookingID });
		}
	}

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">Check in booking #{bookingID}</Heading>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={bookingData} />

			{!hasBreakfast && (
				<Box>
					<Checkbox
						checked={addBreakfast}
						onChange={() => {
							setAddBreakfast((addBreakfast) => !addBreakfast);
							setConfirmPaid(false);
						}}
						disabled={addBreakfast}
						id="breakfast"
					>
						Want to add a breakfast for{" "}
						{formatCurrency(optionalBreakfastPrice)}?
					</Checkbox>
				</Box>
			)}

			<Box>
				<Checkbox
					checked={confirmPaid}
					onChange={() =>
						setConfirmPaid((confirmPaid) => !confirmPaid)
					}
					disabled={confirmPaid || isCheckIn}
					id="confirm"
				>
					I confirm that {guests?.fullName} has paid the total amount
					of{" "}
					{!addBreakfast
						? formatCurrency(totalPrice)
						: `${formatCurrency(
								totalPrice + optionalBreakfastPrice
						  )} (${formatCurrency(totalPrice)} + ${formatCurrency(
								optionalBreakfastPrice
						  )})`}
				</Checkbox>
			</Box>

			<ButtonGroup>
				<Button
					onClick={handleCheckin}
					disabled={!confirmPaid || isCheckIn}
					$cursor={
						!confirmPaid || isCheckIn ? "not-allowed" : "pointer"
					}
				>
					Check in booking #{bookingID}
				</Button>
				<Button $variations="secondary" onClick={moveBack}>
					Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default CheckinBooking;

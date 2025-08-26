import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useBooking } from "./useBooking";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function BookingDetail() {
	const { bookingData, isLoading } = useBooking();
	const navigate = useNavigate();
	const { checkout, isCheckout } = useCheckout();
	const { deleteBooking, isDeleting } = useDeleteBooking();
	const { status, id: bookingID } = bookingData || {};
	const moveBack = useMoveBack();

	if (!bookingData) return null;
	if (isLoading) return <Spinner />;

	const statusToTagName = {
		unconfirmed: "blue",
		"checked-in": "green",
		"checked-out": "silver",
	};

	return (
		<>
			<Row type="horizontal">
				<HeadingGroup>
					<Heading as="h1">Booking #{bookingID}</Heading>
					<Tag $type={statusToTagName[status]}>
						{status?.replace("-", " ")}
					</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; Back</ButtonText>
			</Row>

			<BookingDataBox booking={bookingData} />

			<ButtonGroup>
				{status === "unconfirmed" && (
					<Button
						icon={<HiArrowDownOnSquare />}
						onClick={() => navigate(`/checkin/${bookingID}`)}
					>
						Check in
					</Button>
				)}
				{status === "checked-in" && (
					<Button
						icon={<HiArrowUpOnSquare />}
						onClick={() => checkout(bookingID)}
						disabled={isCheckout}
					>
						Check out
					</Button>
				)}

				<Modal>
					<Modal.Open opens="delete">
						<Button $variations="danger">Delete</Button>
					</Modal.Open>

					<Modal.Window name="delete">
						<ConfirmDelete
							resourceName="booking"
							disabled={isDeleting}
							onConfirm={() =>
								deleteBooking(bookingID, {
									onSettled: () => navigate(-1),
								})
							}
							onCloseModal={() => console.log("Closed")}
						/>
					</Modal.Window>
				</Modal>

				<Button $variations="secondary" onClick={moveBack}>
					&larr; Back
				</Button>
			</ButtonGroup>
		</>
	);
}

export default BookingDetail;

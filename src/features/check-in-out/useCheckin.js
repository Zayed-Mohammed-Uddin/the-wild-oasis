import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export function useCheckin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate: checkin, isPending: isCheckin } = useMutation({
		mutationFn: ({ bookingID, breakfast = {} }) =>
			updateBooking(bookingID, {
				status: "checked-in",
				isPaid: true,
				...breakfast,
			}),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked in`);
			queryClient.invalidateQueries({ active: true });
			navigate("/");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { checkin, isCheckin };
}

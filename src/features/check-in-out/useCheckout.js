import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";    
import { updateBooking } from "../../services/apiBookings";

export function useCheckout() {
	const queryClient = useQueryClient();

	const { mutate: checkout, isLoading: isCheckout } = useMutation({
		mutationFn: (bookingID) =>
			updateBooking(bookingID, {
				status: "checked-out",
			}),
		onSuccess: (data) => {
			toast.success(`Booking #${data.id} successfully checked out`);
			queryClient.invalidateQueries({ active: true });
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { checkout, isCheckout };
}

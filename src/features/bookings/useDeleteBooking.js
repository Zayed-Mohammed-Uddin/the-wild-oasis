import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteBooking() {
	const queryClient = useQueryClient();
	const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
		mutationFn: deleteBookingApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["bookings"] });
			toast.success("Booking deleted successfully!");
		},
		onError: (error) => {
			toast.error("Error deleting booking: " + error.message);
		},
	});
	return {
		deleteBooking,
		isDeleting,
	};
}

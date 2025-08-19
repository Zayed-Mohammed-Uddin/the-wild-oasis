import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteCabin() {
	const queryClient = useQueryClient();
	const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
		mutationFn: deleteCabinApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			toast.success("Cabin deleted successfully!");
		},
		onError: (error) => {
			toast.error("Error deleting cabin: " + error.message);
		},
	});
	return {
		deleteCabin,
		isDeleting,
	};
}

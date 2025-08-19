import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabin as updateCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
	const queryClient = useQueryClient();
	const { mutate: updateCabin, isLoading: isEditing } = useMutation({
		mutationFn: ({ id, cabin }) => updateCabinApi(id, cabin),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			toast.success("Cabin updated successfully!");
		},
		onError: (error) => {
			toast.error("Error updating cabin: " + error.message);
		},
	});

	return {
		updateCabin,
		isEditing,
	};
}

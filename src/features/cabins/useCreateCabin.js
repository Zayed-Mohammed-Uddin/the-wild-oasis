import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin as createCabinApi } from "../../services/apiCabins";

export function useCreateCabin() {
	const queryClient = useQueryClient();

	const { mutate: createCabin, isLoading: isCreating } = useMutation({
		mutationFn: createCabinApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			toast.success("Cabin created successfully!");
		},
		onError: (error) => {
			toast.error("Error creating cabin: " + error.message);
		},
	});

	return {
		createCabin,
		isCreating,
	};
}

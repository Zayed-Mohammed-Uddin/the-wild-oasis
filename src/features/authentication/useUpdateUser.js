import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser as updateCurrentUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
	const queryClient = useQueryClient();
	const {
		mutate: updateCurrentUser,
		isPending: isLoading,
		isError,
	} = useMutation({
		mutationFn: () => updateCurrentUserApi(),
		onSuccess: (data) => {
			toast.success("Successfully updated user information");
			queryClient.setQueryData(["user"], data.user);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return {
		updateCurrentUser,
		isLoading,
		isError,
	};
}

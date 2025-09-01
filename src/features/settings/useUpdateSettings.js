import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSettings as updateSettingsApi } from "../../services/apiSettings";

export function useUpdateSettings() {
	const queryClient = useQueryClient();
	const { mutate: updateSettings, isPending: isUpdating } = useMutation({
		mutationFn: updateSettingsApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["settings"] });
			toast.success("Settings updated successfully!");
		},
		onError: (error) => {
			toast.error("Error updating settings: " + error.message);
		},
	});

	return {
		updateSettings,
		isUpdating,
	};
}

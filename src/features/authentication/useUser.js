import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
	const {
		data: user,
		isPending: isLoading,
		isError,
	} = useQuery({
		queryKey: ["user"],
		queryFn: getCurrentUser,
	});

	return { user, isLoading, isError, isAuthenticated: Boolean(user?.id) };
}

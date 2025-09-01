import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { mutate: login, isPending: isLoading } = useMutation({
		mutationFn: ({ email, password }) => loginApi({ email, password }),
		onSuccess: (data) => {
			navigate("/dashboard", { replace: true });
			queryClient.setQueryData(["user"], data.user);
			toast.success("Logged in successfully!");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return { login, isLoading };
}

import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
	const { mutate: signup, isPending: isLoading } = useMutation({
		mutationFn: signupApi,
		onSuccess: ({ data }) => {
			toast.success(
				"Signup successful! Please check your email for verification."
			);
			console.log("Signup successful:", data);
		},
		onError: (error) => {
			toast.error("Signup failed. Please try again.");
			console.error("Signup failed:", error);
		},
	});
	return { signup, isLoading };
}

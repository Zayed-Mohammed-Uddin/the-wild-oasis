import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
	const {
		isLoading,
		error,
		data: cabinData,
	} = useQuery({
		queryKey: ["cabins"],
		queryFn: getCabins,
	});
	return {
		isLoading,
		error,
		cabinData,
	};
}

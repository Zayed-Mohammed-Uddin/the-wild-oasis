import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
	const [searchParams] = useSearchParams();
	const queryClient = useQueryClient();

	// 1) Filter
	const filterValue = searchParams.get("status");
	const filter =
		!filterValue || filterValue == "all"
			? null
			: { field: "status", value: filterValue, method: "eq" };

	// 2) Sort
	const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
	const [field, direction] = sortByRaw.split("-");
	const sortBy = { field, direction };

	// 3) Pagination
	const page = parseInt(searchParams.get("page")) || 1;

	// Fetching Current Page
	const { isLoading, error, data } = useQuery({
		queryKey: ["bookings", filter, sortBy, page],
		queryFn: () => getBookings({ filter, sortBy, page }),
	});

	const nextPage = page + 1;
	const prevPage = page - 1;

	// Prefetch next page (if more bookings exists)
	if (data?.count > nextPage * 10) {
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, nextPage],
			queryFn: () => getBookings({ filter, sortBy, page: nextPage }),
		});
	}

	// Prefetch previous page (only if not exists)
	if (prevPage >= 1) {
		queryClient.prefetchQuery({
			queryKey: ["bookings", filter, sortBy, prevPage],
			queryFn: () => getBookings({ filter, sortBy, page: prevPage }),
		});
	}

	return {
		isLoading,
		error,
		bookingsData: data?.data ?? [],
		count: data?.count ?? 0,
	};
}

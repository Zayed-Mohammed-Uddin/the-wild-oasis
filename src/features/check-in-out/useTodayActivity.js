import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
	const {
		data: activities,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["today-activity"],
		queryFn: getStaysTodayActivity,
	});
	return { activities: activities ?? [], isLoading, error };
}

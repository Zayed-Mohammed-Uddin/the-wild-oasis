import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Checkin from "./pages/Checkin";
import PageNotFound from "./pages/PageNotFound";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 30,
			refetchOnWindowFocus: true,
		},
	},
});

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Navigate to="/dashboard" replace />,
			},
			{
				path: "/dashboard",
				element: <Dashboard />,
			},
			{
				path: "/bookings",
				element: <Bookings />,
			},
			{
				path: "/bookings/:bookingID",
				element: <Booking />,
			},
			{
				path: "/checkin/:bookingID",
				element: <Checkin />,
			},
			{
				path: "/cabins",
				element: <Cabins />,
			},
			{
				path: "/users",
				element: <Users />,
			},
			{
				path: "/settings",
				element: <Settings />,
			},
			{
				path: "/account",
				element: <Account />,
			},
		],
	},
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "*",
		element: <PageNotFound />,
	},
]);

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			<GlobalStyles />
			<RouterProvider router={router} />
			<Toaster
				position="top-center"
				gutter={12}
				containerStyle={{ margin: "12px" }}
				toastOptions={{
					success: {
						duration: 3000,
					},
					error: {
						duration: 5000,
					},
					style: {
						fontSize: "16px",
						maxWidth: "500px",
						padding: "16px 24px",
						backgroundColor: "var(--color-grey-0)",
						color: "var(--color-grey-700)",
					},
				}}
			/>
		</QueryClientProvider>
	);
}

export default App;

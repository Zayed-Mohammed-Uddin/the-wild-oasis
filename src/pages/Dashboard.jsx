import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Header from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
	return (
		<>
			<Row $type="horizontal">
				<Header as="h1">Dashboard</Header>
				<DashboardFilter />
			</Row>

			<DashboardLayout />
		</>
	);
}

export default Dashboard;

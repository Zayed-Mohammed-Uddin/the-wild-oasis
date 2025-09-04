import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useTodayActivity } from "./useTodayActivity";
import Spinner from "../../ui/Spinner";
import TodayItem from "./TodayItem";

const StyledToday = styled.div`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);
	padding: 2.2rem;
	display: flex;
	flex-direction: column;
	gap: 2.4rem;
	grid-column: 1 / span 2;
	padding-top: 2.4rem;

	/* Tablet styles */
	@media (max-width: 768px) {
		grid-column: 1 / -1;
		padding: 2.4rem;
		gap: 2rem;
	}

	/* Mobile styles */
	@media (max-width: 480px) {
		padding: 1.6rem;
		gap: 1.6rem;
	}
`;

const TodayList = styled.ul`
	overflow-y: auto;
	overflow-x: hidden;
	max-height: 30rem;
`;

const NoActivity = styled.p`
	text-align: center;
	font-size: 1.8rem;
	font-weight: 500;
	margin-top: 0.8rem;
`;

function TodayActivity() {
	const { activities, isLoading } = useTodayActivity();
	return (
		<StyledToday>
			<Row $type="horizontal">
				<Heading as="h2">Today</Heading>
			</Row>
			{!isLoading ? (
				activities.length > 0 ? (
					<TodayList>
						{activities?.map((activity) => (
							<TodayItem key={activity.id} activity={activity} />
						))}
					</TodayList>
				) : (
					<NoActivity>No activity today</NoActivity>
				)
			) : (
				<Spinner />
			)}
		</StyledToday>
	);
}

export default TodayActivity;

import Header from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
	return (
		<>
			<Header as="h1">Update your account</Header>

			<Row>
				<Header as="h3">Update user data</Header>
				<p>Update user data form</p>
			</Row>

			<Row>
				<Header as="h3">Update password</Header>
				<p>Update user password form</p>
			</Row>
		</>
	);
}

export default Account;

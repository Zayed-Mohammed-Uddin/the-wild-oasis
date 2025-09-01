import Header from "../ui/Heading";
import Row from "../ui/Row";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

function Account() {
	return (
		<>
			<Header as="h1">Update your account</Header>

			<Row>
				<Header as="h3">Update user data</Header>
				<UpdateUserDataForm />
			</Row>

			<Row>
				<Header as="h3">Update password</Header>
				<UpdatePasswordForm />
			</Row>
		</>
	);
}

export default Account;

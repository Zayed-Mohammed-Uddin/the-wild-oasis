import SignupForm from "../features/authentication/SignupForm";
import Header from "../ui/Heading";

function NewUsers() {
	return (
		<>
			<Header as="h1">Create a new user</Header>
			<SignupForm />
		</>
	);
}

export default NewUsers;

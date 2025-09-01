import { useState } from "react";
import { useUpdateUser } from "./useUpdateUser";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUser } from "./useUser";

function UpdateUserDataForm() {
	const {
		user: {
			email,
			user_metadata: { fullName: currentFullName },
		},
	} = useUser();

	const { updateCurrentUser, isLoading: isUpdatingUser } = useUpdateUser();

	const [fullName, setFullName] = useState(currentFullName);
	const [avatar, setAvatar] = useState(null);

	function handleSubmit(e) {
		e.preventDefault();
		if (!fullName) return;
		updateCurrentUser(
			{ fullName, avatar },
			{
				onSuccess: () => {
					setAvatar(null);
					e.target.reset();
				},
			}
		);
	}

	function handleReset() {
		setFullName(currentFullName);
		setAvatar(null);
	}

	return (
		<Form onSubmit={handleSubmit}>
			<FormRow label="Email address">
				<Input value={email} disabled />
			</FormRow>
			<FormRow label="Full name">
				<Input
					type="text"
					value={fullName}
					onChange={(e) => setFullName(e.target.value)}
					placeholder="Enter your full name"
					disabled={isUpdatingUser}
					id="fullName"
				/>
			</FormRow>
			<FormRow label="Avatar image">
				<FileInput
					id="avatar"
					accept="image/*"
					disabled={isUpdatingUser}
					onChange={(e) => setAvatar(e.target.files[0])}
				/>
			</FormRow>
			<FormRow>
				<Button
					type="reset"
					$variations="secondary"
					onClick={handleReset}
				>
					Revert
				</Button>
				<Button>Update account</Button>
			</FormRow>
		</Form>
	);
}

export default UpdateUserDataForm;

import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import { useState } from "react";
import FileInput from "../../ui/FileInput";

function SignupForm() {
	const {
		register,
		formState: { errors },
		watch,
		handleSubmit,
		reset,
	} = useForm();

	const { signup, isLoading } = useSignup();

	const [avatar, setAvatar] = useState(null);

	const onSubmit = (data) => {
		const { fullName, email, password } = data;
		if (!fullName || !email || !password) return;
		signup(
			{ fullName, email, password, avatar },
			{
				onSettled: () => {
					reset();
				},
			}
		);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="Full name" error={errors.fullName?.message}>
				<Input
					type="text"
					id="fullName"
					placeholder="Enter your full name"
					disabled={isLoading}
					{...register("fullName", {
						required: "Full name is required",
					})}
				/>
			</FormRow>

			<FormRow label="Email address" error={errors.email?.message}>
				<Input
					type="email"
					id="email"
					placeholder="Enter your email address"
					disabled={isLoading}
					{...register("email", {
						required: "Email is required",
						pattern: {
							value: /\S+@\S+\.\S+/,
							message: "Email is invalid",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Password (min 8 characters)"
				error={errors.password?.message}
			>
				<Input
					type="password"
					id="password"
					placeholder="Enter your password"
					disabled={isLoading}
					{...register("password", {
						required: "Password is required",
						minLength: {
							value: 8,
							message: "Password must be at least 8 characters",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Repeat password"
				error={errors.passwordConfirm?.message}
			>
				<Input
					type="password"
					id="passwordConfirm"
					placeholder="Repeat your password"
					disabled={isLoading}
					{...register("passwordConfirm", {
						required: "Please repeat your password",
						validate: (value) =>
							value === watch("password") ||
							"Passwords do not match",
					})}
				/>
			</FormRow>

			<FormRow label="Upload avatar">
				<FileInput
					id="avatar"
					accept="image/*"
					disabled={isLoading}
					onChange={(e) => setAvatar(e.target.files[0])}
				/>
			</FormRow>

			<FormRow>
				<Button
					$variations="secondary"
					type="reset"
					onClick={() => reset()}
				>
					Cancel
				</Button>
				<Button>Create new user</Button>
			</FormRow>
		</Form>
	);
}

export default SignupForm;

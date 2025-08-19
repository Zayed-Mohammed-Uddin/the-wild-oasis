import { useForm } from "react-hook-form";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

function UpdateSettingsForm() {
	const { isLoading, error, settings } = useSettings();
	const { updateSettings, isUpdating } = useUpdateSettings();
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm();

	if (isLoading) return <Spinner />;
	if (error) return <div>Error loading settings: {error.message}</div>;

	const onSubmit = (data) => {
		updateSettings(data);
	};
	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow
				label="Minimum nights/booking"
				error={errors?.minBookingLength?.message}
			>
				<Input
					type="number"
					id="min-nights"
					disabled={isUpdating}
					defaultValue={settings?.minBookingLength}
					{...register("minBookingLength", {
						minLength: 1,
						maxLength: 2,
						min: {
							value: 1,
							message: "Minimum nights must be at least 1",
						},
						max: {
							value: 10,
							message:
								"Minimum nights must be no greater than 10",
						},
						validate: (value) =>
							Number(value) <=
								Number(getValues().maxBookingLength) ||
							"Minimum nights must be less than maximum nights",
					})}
				/>
			</FormRow>
			<FormRow
				label="Maximum nights/booking"
				error={errors?.maxBookingLength?.message}
			>
				<Input
					type="number"
					id="max-nights"
					disabled={isUpdating}
					defaultValue={settings?.maxBookingLength}
					{...register("maxBookingLength", {
						minLength: 1,
						maxLength: 2,
						min: {
							value: 1,
							message: "Maximum nights must be at least 1",
						},
						max: {
							value: 10,
							message:
								"Maximum nights must be no greater than 10",
						},
						validate: (value) =>
							Number(value) >=
								Number(getValues().minBookingLength) ||
							"Maximum nights must be greater than minimum nights",
					})}
				/>
			</FormRow>
			<FormRow
				label="Maximum guests/booking"
				error={errors?.maxGuestsPerBooking?.message}
			>
				<Input
					type="number"
					id="max-guests"
					disabled={isUpdating}
					defaultValue={settings?.maxGuestsPerBooking}
					{...register("maxGuestsPerBooking", {
						minLength: 1,
						maxLength: 2,
						min: {
							value: 1,
							message: "Minimum guests must be at least 1",
						},
					})}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					disabled={isUpdating}
					defaultValue={settings?.breakfastPrice}
					{...register("breakfastPrice")}
				/>
			</FormRow>
			<FormRow>
				<Button type="submit" disabled={isUpdating}>
					{isUpdating ? "Updating..." : "Update Settings"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;

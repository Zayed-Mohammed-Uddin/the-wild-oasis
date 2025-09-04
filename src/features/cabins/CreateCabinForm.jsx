import { useForm } from "react-hook-form";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import { useCreateCabin } from "./useCreateCabin";
import { useUpdateCabin } from "./useUpdateCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	const { createCabin, isCreating } = useCreateCabin();
	const { updateCabin, isEditing } = useUpdateCabin();

	// editing a cabin
	const { id: editID, ...editValues } = cabinToEdit;
	const editSession = Boolean(editID);

	// form handling
	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: editSession ? editValues : {},
	});
	const { errors } = formState;
	const isWorking = isCreating || isEditing;

	const onSubmit = (data) => {
		const image =
			typeof data.image === "string" ? data.image : data.image[0];

		const discountValue = data.discount === "" ? 0 : Number(data.discount);

		const cabinData = {
			...data,
			image,
			discount: discountValue,
		};

		if (editSession) {
			updateCabin(
				{ id: editID, cabin: cabinData },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		} else {
			createCabin(cabinData, {
				onSuccess: () => {
					reset();
					onCloseModal?.();
				},
			});
		}
	};

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			$type={onCloseModal ? "modal" : "regular"}
		>
			<FormRow label="Cabin name*" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					placeholder="Enter cabin name"
					{...register("name", { required: "The field is required" })}
				/>
			</FormRow>

			<FormRow
				label="Maximum capacity*"
				error={errors?.maxCapacity?.message}
			>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
					placeholder="Enter maximum capacity"
					{...register("maxCapacity", {
						required: "The field is required",
						min: {
							value: 1,
							message: "Capacity must be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Regular price*"
				error={errors?.regularPrice?.message}
			>
				<Input
					type="number"
					id="regularPrice"
					disabled={isWorking}
					placeholder="Enter regular price"
					{...register("regularPrice", {
						required: "The field is required",
						min: {
							value: 1,
							message: "Price must be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					disabled={isWorking}
					placeholder="Enter discount"
					{...register("discount", {
						validate: (value) =>
							Number(value) < Number(getValues().regularPrice) ||
							"Discount must be less than the regular price",
					})}
				/>
			</FormRow>

			<FormRow label="Description*" error={errors?.description?.message}>
				<Textarea
					id="description"
					defaultValue=""
					disabled={isWorking}
					placeholder="Enter cabin description"
					{...register("description", {
						required: "The field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Cabin photo*" error={errors?.image?.message}>
				<FileInput
					id="image"
					accept="image/*"
					disabled={isWorking}
					{...register("image", {
						required: editSession ? false : "The field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				<Button
					$variations="secondary"
					type="reset"
					disabled={isWorking}
				>
					Reset
				</Button>
				<Button
					$variations="primary"
					type="submit"
					disabled={isWorking}
				>
					{editSession
						? isEditing
							? "Updating..."
							: "Update cabin"
						: isCreating
						? "Creating..."
						: "Add cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;

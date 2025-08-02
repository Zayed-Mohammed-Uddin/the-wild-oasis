import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import { createCabin } from "../../services/apiCabins";

function CreateCabinForm() {
	const { register, handleSubmit, reset, getValues, formState } = useForm();
	const { errors } = formState;
	const queryClient = useQueryClient();

	const { mutate: createCabinMutation, isLoading: isCreating } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			queryClient.invalidateQueries(["cabins"]);
			toast.success("Cabin created successfully!");
			reset();
		},
		onError: (error) => {
			toast.error("Error creating cabin: " + error.message);
		},
	});

	const onSubmit = (data) => {
		const cabinData = {
			...data,
			image: data.image[0],
		};
		createCabinMutation(cabinData);
	};

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<FormRow label="Cabin name" error={errors?.name?.message}>
				<Input
					type="text"
					id="name"
					{...register("name", { required: "The field is required" })}
				/>
			</FormRow>

			<FormRow
				label="Maximum capacity"
				error={errors?.maxCapacity?.message}
			>
				<Input
					type="number"
					id="maxCapacity"
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
				label="Regular price"
				error={errors?.regularPrice?.message}
			>
				<Input
					type="number"
					id="regularPrice"
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
					defaultValue={0}
					{...register("discount", {
						required: "The field is required",
						validate: (value) =>
							Number(value) < Number(getValues().regularPrice) ||
							"Discount must be less than the regular price",
					})}
				/>
			</FormRow>

			<FormRow label="Description" error={errors?.description?.message}>
				<Textarea
					type="number"
					id="description"
					defaultValue=""
					{...register("description", {
						required: "The field is required",
					})}
				/>
			</FormRow>

			<FormRow label="Cabin photo" error={errors?.image?.message}>
				<FileInput
					id="image"
					accept="image/*"
					{...register("image", {
						required: "The field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				<Button variation="secondary" type="reset">
					Reset
				</Button>
				<Button type="submit" disabled={isCreating}>
					{isCreating ? "Creating..." : "Add cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;

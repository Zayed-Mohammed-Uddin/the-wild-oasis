import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import { StyledRow } from "../../ui/Table";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import toast from "react-hot-toast";

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.61) translateX(-4px);
`;

const Cabin = styled.div`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
`;

const Capacity = styled(Cabin)`
	color: var(--color-grey-500);
`;

const Price = styled.div`
	font-family: "Sono";
	font-weight: 600;
`;

const Discount = styled.div`
	font-family: "Sono";
	font-weight: 500;
	color: var(--color-green-700);
`;

function CabinItem({ cabin }) {
	const queryClient = useQueryClient();

	const { mutate: deleteCabinMutation, isLoading: isDeleting } = useMutation({
		mutationFn: deleteCabin,
		onSuccess: () => {
			queryClient.invalidateQueries(["cabins"]);
			toast.success("Cabin deleted successfully!");
		},
		onError: (error) => {
			toast.error("Error deleting cabin:", error.message);
		},
	});

	return (
		<StyledRow role="row" columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
			<Img src={cabin.image} alt={cabin.name} />
			<Cabin>{cabin.name}</Cabin>
			<Capacity>{cabin.maxCapacity}</Capacity>
			<Price>{formatCurrency(cabin.regularPrice)}</Price>
			<Discount>{formatCurrency(cabin.discount)}</Discount>
			<Button
				sizes="small"
				variations="danger"
				onClick={() => deleteCabinMutation(cabin.id)}
				disabled={isDeleting}
			>
				{isDeleting ? "Deleting..." : "Delete"}
			</Button>
		</StyledRow>
	);
}

export default CabinItem;

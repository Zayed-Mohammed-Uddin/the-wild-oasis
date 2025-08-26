import styled from "styled-components";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import { formatCurrency } from "../../utils/helpers";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";

import CreateCabinForm from "./CreateCabinForm";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";

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
	const { isDeleting, deleteCabin } = useDeleteCabin();
	const { createCabin, isCreating } = useCreateCabin();

	const handleDuplicate = () => {
		createCabin({
			name: `Copy of ${cabin.name}`,
			image: cabin.image,
			maxCapacity: cabin.maxCapacity,
			regularPrice: cabin.regularPrice,
			discount: cabin.discount,
			description: cabin.description,
		});
	};

	return (
		<>
			<Table.Row role="row" $columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
				<Img src={cabin.image} alt={cabin.name} />
				<Cabin>{cabin.name}</Cabin>
				<Capacity>{cabin.maxCapacity}</Capacity>
				<Price>{formatCurrency(cabin.regularPrice)}</Price>
				<Discount>
					{cabin.discount ? (
						formatCurrency(cabin.discount)
					) : (
						<span>&mdash;</span>
					)}
				</Discount>
				<div style={{ display: "flex", gap: "0.8rem" }}>
					<Modal>
						<Menus>
							<Menus.Menu>
								<Menus.Toggle id={cabin.id} />
								<Menus.List id={cabin.id}>
									<Menus.Button
										icon={<HiSquare2Stack />}
										onClick={handleDuplicate}
										disabled={isCreating}
									>
										Duplicate
									</Menus.Button>

									<Modal.Open opens="edit">
										<Menus.Button icon={<HiPencil />}>
											Edit
										</Menus.Button>
									</Modal.Open>

									<Modal.Open opens="delete">
										<Menus.Button icon={<HiTrash />}>
											Delete
										</Menus.Button>
									</Modal.Open>
								</Menus.List>
							</Menus.Menu>
						</Menus>

						<Modal.Window name="edit">
							<CreateCabinForm cabinToEdit={cabin} />
						</Modal.Window>

						<Modal.Window name="delete">
							<ConfirmDelete
								resourceName="cabins"
								disabled={isDeleting}
								onConfirm={() => deleteCabin(cabin.id)}
							/>
						</Modal.Window>
					</Modal>
				</div>
			</Table.Row>
		</>
	);
}

export default CabinItem;

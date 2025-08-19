import CreateCabinForm from "./CreateCabinForm";
import Row from "../../ui/Row";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

function AddCabin() {
	return (
		<Row>
			<Modal>
				<Modal.Open opens="cabin-form">
					<Button $sizes="full" $variations="primary">
						Add New Cabin
					</Button>
				</Modal.Open>
				<Modal.Window name="cabin-form">
					<CreateCabinForm />
				</Modal.Window>
			</Modal>
		</Row>
	);
}

export default AddCabin;

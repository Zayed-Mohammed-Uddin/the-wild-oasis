import styled from "styled-components";

const StyledFormRow = styled.div`
	display: grid;
	align-items: center;
	grid-template-columns: 24rem 1fr 1.2fr;
	gap: 2.4rem;

	padding: 1.2rem 0;

	&:first-child {
		padding-top: 0;
	}

	&:last-child {
		padding-bottom: 0;
	}

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}

	&:has(button) {
		display: flex;
		justify-content: flex-end;
		gap: 1.2rem;
	}

	/* Mobile styles */
	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		gap: 1.2rem;
		padding: 1.6rem 0;

		&:has(button) {
			justify-content: stretch;
			flex-direction: column;

			button {
				width: 100%;
			}
		}
	}

	@media (max-width: 480px) {
		gap: 1rem;
		padding: 1.2rem 0;
	}
`;
const Label = styled.label`
	font-weight: 500;
`;

const Error = styled.span`
	font-size: 1.4rem;
	color: var(--color-red-700);

	/* Mobile styles */
	@media (max-width: 768px) {
		font-size: 1.2rem;
		margin-top: 0.4rem;
	}
`;
function FormRow({ label, children, error }) {
	return (
		<StyledFormRow>
			{label && <Label htmlFor={children.props.id}>{label}</Label>}
			{children}
			{error && <Error>{error}</Error>}
		</StyledFormRow>
	);
}

export default FormRow;

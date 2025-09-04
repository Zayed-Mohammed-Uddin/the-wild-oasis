import styled from "styled-components";

const TableOperations = styled.div`
	display: flex;
	align-items: center;
	gap: 1.6rem;

	/* Mobile/tablet: stack vertically and stretch children */
	@media (max-width: 768px) {
		flex-direction: column;
		align-items: stretch;
		gap: 1.2rem;
		width: 100%;
	}

	@media (max-width: 480px) {
		gap: 1rem;
	}
`;

export default TableOperations;

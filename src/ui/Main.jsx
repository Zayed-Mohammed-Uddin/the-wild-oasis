import styled from "styled-components";

const StyledMain = styled.main`
	padding: 3rem;
	background-color: var(--color-grey-100);
	grid-column: 2 / -1;
	grid-row: 2;
	overflow-y: auto;
	height: 100%;
	max-height: 100vh;

	/* Mobile styles */
	@media (max-width: 768px) {
		grid-column: 1;
		grid-row: 2;
		padding: 2rem;
	}

	@media (max-width: 480px) {
		padding: 1.6rem;
	}
`;

function Main({ children }) {
	return <StyledMain>{children}</StyledMain>;
}

export default Main;

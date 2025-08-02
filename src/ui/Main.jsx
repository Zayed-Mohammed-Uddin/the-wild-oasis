import styled from "styled-components";

const StyledMain = styled.main`
	padding: 4rem 4.8rem 6.4rem;
	background-color: var(--color-grey-50);
	grid-column: 2 / -1;
	grid-row: 2;
	overflow-y: auto;
	height: 100%;
	max-height: 100vh;
`;

function Main({ children }) {
	return <StyledMain>{children}</StyledMain>;
}

export default Main;

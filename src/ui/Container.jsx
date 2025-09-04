import styled from "styled-components";

const StyledContainer = styled.section`
	height: 100dvh;
	display: grid;
	grid-template-columns: 24rem 1fr;
	grid-template-rows: auto 1fr auto;
	overflow: hidden;

	/* Mobile styles - sidebar becomes overlay, so main content takes full width */
	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr auto;
	}
`;

function Container({ children }) {
	return <StyledContainer>{children}</StyledContainer>;
}

export default Container;

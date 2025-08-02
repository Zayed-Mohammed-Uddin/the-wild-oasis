import styled from "styled-components";

const StyledContainer = styled.section`
	height: 100dvh;
	display: grid;
	grid-template-columns: 24rem 1fr;
	grid-template-rows: auto 1fr auto;
	overflow: hidden;
`;

function Container({ children }) {
	return <StyledContainer>{children}</StyledContainer>;
}

export default Container;

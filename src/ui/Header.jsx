import styled from "styled-components";
import Heading from "./Heading";

const StyledHeader = styled.header`
	padding: 20px;
	background-color: #f1f1f1;
	text-align: center;
	grid-column: 2 / -1;
	grid-row: 1;
`;

function Header() {
	return (
		<StyledHeader>
			<Heading as="h1">Header</Heading>
		</StyledHeader>
	);
}

export default Header;

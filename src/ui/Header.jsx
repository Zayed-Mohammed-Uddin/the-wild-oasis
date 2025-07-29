import styled, { css } from "styled-components";

const Header = styled.header`
	${(props) =>
		props.as === "h1" &&
		css`
			font-size: 3rem;
			font-weight: 700;
			color: var(--color-grey-800);
		`}
	${(props) =>
		props.as === "h2" &&
		css`
			font-size: 2rem;
			color: var(--color-grey-700);
			font-weight: 600;
		`}
    ${(props) =>
		props.as === "h3" &&
		css`
			font-size: 2rem;
			color: var(--color-grey-600);
			font-weight: 600;
		`}

	text-align: center;
`;

export default Header;

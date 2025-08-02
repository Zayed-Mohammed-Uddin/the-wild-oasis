import styled, { css } from "styled-components";

const Row = styled.div`
	display: flex;
	${(props) =>
		props.type === "horizontal" &&
		css`
			align-items: center;
			justify-content: space-between;
		`}
	${(props) =>
		(props.type === "vertical" || !props.type) &&
		css`
			flex-direction: column;
			gap: 1rem;
		`}
`;

export default Row;

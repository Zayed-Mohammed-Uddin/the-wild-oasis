import styled, { css } from "styled-components";

const Row = styled.div`
	display: flex;
	${(props) =>
		props.$type === "horizontal" &&
		css`
			align-items: center;
			justify-content: space-between;
			flex-direction: row;

			/* Mobile styles only */
			@media (max-width: 1080px) {
				flex-direction: column;
				align-items: stretch;
				gap: 1.6rem;
			}
		`}
	${(props) =>
		(props.$type === "vertical" || !props.$type) &&
		css`
			flex-direction: column;
			gap: 1rem;

			/* Mobile styles */
			@media (max-width: 480px) {
				gap: 1.6rem;
			}
		`}
`;

export default Row;

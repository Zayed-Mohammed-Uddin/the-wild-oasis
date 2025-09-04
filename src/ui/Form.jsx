import styled, { css } from "styled-components";

const Form = styled.form`
	${(props) =>
		props.$type !== "modal" &&
		css`
			padding: 2.4rem 4rem;

			/* Box */
			background-color: var(--color-grey-0);
			border: 1px solid var(--color-grey-100);
			border-radius: var(--border-radius-md);

			/* Mobile styles */
			@media (max-width: 768px) {
				padding: 2rem;
			}

			@media (max-width: 480px) {
				padding: 1.6rem;
			}
		`}

	${(props) =>
		props.$type === "modal" &&
		css`
			width: 80rem;

			/* Mobile styles for modal forms */
			@media (max-width: 768px) {
				width: 100%;
				max-width: 100%;
			}

			@media (max-width: 480px) {
				width: 100%;
				max-width: 100%;
			}
		`}
    
  overflow: hidden;
	font-size: 1.4rem;

	/* Mobile font size adjustment */
	@media (max-width: 480px) {
		font-size: 1.2rem;
	}
`;

export default Form;

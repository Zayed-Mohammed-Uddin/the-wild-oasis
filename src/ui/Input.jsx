import styled from "styled-components";

const Input = styled.input`
	border: 1px solid var(--color-grey-300);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-sm);
	padding: 0.8rem 1.2rem;
	box-shadow: var(--shadow-sm);

	&:focus {
		outline: none;
		border: 1px solid var(--color-brand-600);
		background-color: var(--color-grey-0);
	}

	&:disabled {
		background-color: var(--color-grey-200);
		border: 1px solid var(--color-grey-200);
		color: var(--color-grey-500);
		cursor: not-allowed;
	}

	${(props) =>
		props.size === "small" &&
		`
      padding: 0.4rem 0.8rem;
      font-size: 1.2rem;
    `}

	${(props) =>
		props.size === "large" &&
		`
      padding: 1.2rem 1.6rem;
      font-size: 1.6rem;
    `}
`;

export default Input;

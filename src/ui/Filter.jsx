import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
	border: 1px solid var(--color-grey-100);
	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-sm);
	border-radius: var(--border-radius-sm);
	padding: 0.4rem;
	display: flex;
	gap: 0.4rem;

	/* Mobile styles */
	@media (max-width: 640px) {
		justify-content: center;
		flex-wrap: wrap;
		gap: 0.3rem;
		padding: 0.3rem;
	}

	@media (max-width: 480px) {
		gap: 0.2rem;
		padding: 0.2rem;
	}
`;

const FilterButton = styled.button`
	background-color: var(--color-grey-0);
	border: none;

	${(props) =>
		props.$active &&
		css`
			background-color: var(--color-brand-600);
			color: var(--color-brand-50);
		`}

	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;
	padding: 0.44rem 0.8rem;
	transition: all 0.3s;

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}

	/* Mobile styles */
	@media (max-width: 640px) {
		font-size: 1.3rem;
		padding: 0.4rem 0.7rem;
		flex: 1;
		min-width: max-content;
	}

	@media (max-width: 480px) {
		font-size: 1.2rem;
		padding: 0.35rem 0.6rem;
		white-space: nowrap;
	}
`;

function Filter({ filterField, options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentFilter = searchParams.get(filterField) || options[0].value;

	const handleClick = (value) => {
		searchParams.set(filterField, value);
		searchParams.set("page", 1);
		setSearchParams(searchParams);
	};

	return (
		<StyledFilter>
			{options.map((option) => (
				<FilterButton
					key={option.value}
					onClick={() => handleClick(option.value)}
					$active={currentFilter === option.value}
					disabled={currentFilter === option.value}
				>
					{option.label}
				</FilterButton>
			))}
		</StyledFilter>
	);
}

export default Filter;

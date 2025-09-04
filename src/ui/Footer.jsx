import styled from "styled-components";

const StyledFooter = styled.footer`
	padding: 20px;
	text-align: center;
	grid-column: 2 / -1;
	grid-row: 3;
	color: var(--color-blue-700);
	background-color: var(--color-grey-0);

	/* Mobile styles */
	@media (max-width: 768px) {
		grid-column: 1;
		grid-row: 3;
		padding: 1.6rem;
	}

	@media (max-width: 480px) {
		padding: 1.2rem;
		font-size: 1.4rem;
	}
`;

function Footer() {
	return (
		<StyledFooter>
			<p>
				Inspired By <strong>Jonas</strong> &copy;. Implemented By{" "}
				<strong>Zayed</strong>
			</p>
		</StyledFooter>
	);
}

export default Footer;

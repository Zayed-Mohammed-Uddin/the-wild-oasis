import styled from "styled-components";

const StyledFooter = styled.footer`
	padding: 20px;
	background-color: #f1f1f1;
	text-align: center;
	grid-column: 2 / -1;
	grid-row: 3;
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

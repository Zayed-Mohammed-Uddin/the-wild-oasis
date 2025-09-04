import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";

const StyledHeader = styled.header`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 2.4rem;
	background-color: var(--color-grey-0);
	padding: 1.2rem 4.8rem;
	border-bottom: 1px solid var(--color-indigo-100);
	grid-row: 1;
	grid-column: 2 / -1;

	/* Mobile styles */
	@media (max-width: 768px) {
		grid-column: 1;
		grid-row: 1;
		padding: 1.2rem 0.4rem 1.2rem 2.4rem;
		gap: 1.6rem;
	}

	@media (max-width: 480px) {
		padding: 1rem 5.6rem 1rem 1.6rem;
		gap: 1.2rem;
	}
`;

function Header() {
	return (
		<StyledHeader>
			<UserAvatar />
			<HeaderMenu />
		</StyledHeader>
	);
}

export default Header;

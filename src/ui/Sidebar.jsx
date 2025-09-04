import styled from "styled-components";
import { useState } from "react";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import Logo from "./Logo";
import MainNav from "./MainNav";

const SidebarContainer = styled.div`
	position: relative;

	/* Desktop styles - container takes grid position */
	@media (min-width: 769px) {
		grid-column: 1;
		grid-row: 1 / -1;
	}
`;

const StyledSidebar = styled.aside`
	background-color: var(--color-grey-0);
	padding: 3.2rem 2.4rem;
	border-right: 1px solid var(--color-grey-100);
	display: flex;
	flex-direction: column;
	gap: 3.2rem;

	/* Desktop styles - always visible and in grid */
	@media (min-width: 769px) {
		position: static;
		transform: none;
		width: auto;
		height: 100%;
		z-index: auto;
		box-shadow: none;
	}

	/* Mobile styles - collapsible overlay */
	@media (max-width: 768px) {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 28rem;
		z-index: 1000;
		transform: ${(props) =>
			props.$isOpen ? "translateX(0)" : "translateX(-100%)"};
		box-shadow: ${(props) =>
			props.$isOpen ? "0 0 20px rgba(0, 0, 0, 0.1)" : "none"};
		transition: transform 0.3s ease-in-out;
		/* Reset grid positioning for mobile */
		grid-column: unset;
		grid-row: unset;
	}

	@media (max-width: 480px) {
		width: 24rem;
		padding: 2.4rem 1.6rem;
		gap: 2.4rem;
	}
`;

const ToggleButton = styled.button`
	display: none;
	background: var(--color-grey-0);
	border: 1px solid var(--color-grey-200);
	border-radius: var(--border-radius-sm);
	padding: 0.8rem;
	cursor: pointer;
	position: fixed;
	top: 1.6rem;
	left: 1.6rem;
	z-index: 1001;

	&:hover {
		background-color: var(--color-grey-50);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-600);
	}

	/* Show toggle button on mobile only */
	@media (max-width: 768px) {
		display: block;
	}
`;

const Overlay = styled.div`
	display: none;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 999;

	@media (max-width: 768px) {
		display: ${(props) => (props.$isOpen ? "block" : "none")};
	}
`;

function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	const closeSidebar = () => {
		setIsOpen(false);
	};

	return (
		<SidebarContainer>
			<ToggleButton onClick={toggleSidebar}>
				{isOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
			</ToggleButton>

			<Overlay $isOpen={isOpen} onClick={closeSidebar} />

			<StyledSidebar $isOpen={isOpen}>
				<Logo />
				<MainNav onNavigate={closeSidebar} />
			</StyledSidebar>
		</SidebarContainer>
	);
}

export default Sidebar;

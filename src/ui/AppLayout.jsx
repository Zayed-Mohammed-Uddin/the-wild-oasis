import styled from "styled-components";
import { Outlet } from "react-router-dom";

import Container from "./Container";
import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 120rem;
	margin: 0 auto;
	gap: 3.2rem;

	/* Mobile styles */
	@media (max-width: 768px) {
		max-width: 100%;
		gap: 2.4rem;
	}

	@media (max-width: 480px) {
		gap: 1.6rem;
	}
`;

function AppLayout() {
	return (
		<Container>
			<Sidebar />
			<Header />
			<Main>
				<Wrapper>
					<Outlet />
				</Wrapper>
			</Main>
			<Footer />
		</Container>
	);
}

export default AppLayout;

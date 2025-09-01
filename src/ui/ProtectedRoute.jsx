import styled from "styled-components";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: var(--color-grey-50);
`;

function ProtectedRoute({ children }) {
	const navigate = useNavigate();
	const location = useLocation();

	// 1. load the authenticated user
	const { isLoading, isAuthenticated } = useUser();

	// 2. If there is no authenticated user, redirect to the login page
	useEffect(() => {
		if (!isAuthenticated && !isLoading)
			navigate("/login", { replace: true, state: { from: location } });
	}, [isAuthenticated, isLoading, navigate, location]);

	// 3. while loading, show the spinner

	if (isLoading)
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);

	if (!isAuthenticated) return null;

	return children;
}

export default ProtectedRoute;

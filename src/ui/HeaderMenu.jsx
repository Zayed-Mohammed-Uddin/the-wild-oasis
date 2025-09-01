import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import Logout from "../features/authentication/Logout";

const StyledHeaderMenu = styled.ul`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 20px;
	background-color: #f1f1f1;
`;

function HeaderMenu() {
	const navigate = useNavigate();
	return (
		<StyledHeaderMenu>
			<li>
				<ButtonIcon onClick={() => navigate("/account")}>
					<HiOutlineUser />
				</ButtonIcon>
			</li>
			<li>
                <Logout />
			</li>
		</StyledHeaderMenu>
	);
}

export default HeaderMenu;

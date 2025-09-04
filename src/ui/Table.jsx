import { createContext, useContext } from "react";
import styled from "styled-components";

const TableContext = createContext();

const StyledTable = styled.div`
	border: 1px solid var(--color-grey-200);
	font-size: 1.4rem;
	background-color: var(--color-grey-0);
	border-radius: 7px;
	overflow: hidden;

	/* Mobile styles */
	@media (max-width: 768px) {
		overflow-x: auto;
		font-size: 1.2rem;
	}
`;

const CommonRow = styled.div`
	display: grid;
	grid-template-columns: ${(props) => props.$columns};
	column-gap: 2.4rem;
	align-items: center;

	/* Mobile styles */
	@media (max-width: 768px) {
		column-gap: 1.6rem;
		min-width: 600px;
	}

	@media (max-width: 480px) {
		column-gap: 1.2rem;
		min-width: 500px;
	}
`;

const StyledHeader = styled(CommonRow)`
	padding: 1.6rem 2.4rem;
	background-color: var(--color-grey-50);
	border-bottom: 1px solid var(--color-grey-100);
	text-transform: uppercase;
	letter-spacing: 0.4px;
	font-weight: bold;
	color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
	padding: 1.2rem 2.4rem;
	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`;

const StyledBody = styled.section`
	margin: 0.4rem 0;
`;

const StyledFooter = styled.footer`
	background-color: var(--color-grey-50);
	display: flex;
	justify-content: center;
	padding: 1.2rem;
	width: 100%;

	&:not(:has(*)) {
		display: none;
	}

	/* Mobile styles - ensure it spans the full scrollable width */
	@media (max-width: 768px) {
		min-width: 600px;
	}

	@media (max-width: 480px) {
		min-width: 500px;
	}
`;

const Empty = styled.p`
	font-size: 1.6rem;
	font-weight: 500;
	text-align: center;
	margin: 2.4rem;
`;

function Row({ children }) {
	const { columns } = useContext(TableContext);
	return (
		<StyledRow role="row" $columns={columns}>
			{children}
		</StyledRow>
	);
}

function Header({ children }) {
	const { columns } = useContext(TableContext);
	return (
		<StyledHeader role="row" $columns={columns} as="header">
			{children}
		</StyledHeader>
	);
}

function Body({ data, render }) {
	return data.length > 0 ? (
		<StyledBody>{data.map(render)}</StyledBody>
	) : (
		<Empty>No data available to show at this moment</Empty>
	);
}

function Footer({ children }) {
	return <StyledFooter role="row">{children}</StyledFooter>;
}

function Table({ children, columns }) {
	return (
		<TableContext.Provider value={{ columns }}>
			<StyledTable role="table">{children}</StyledTable>
		</TableContext.Provider>
	);
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;

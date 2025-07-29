import styled from "styled-components";
import GlobalStyles from "./styles/globalStyles";

import Header from "./ui/Header";
import Button from "./ui/Button";
import Row from "./ui/Row";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	background-color: #f0f0f0;
`;

const Input = styled.input`
	padding: 12px 15px;
	margin: 10px 0;
	border: 1px solid #ccc;
	border-radius: 4px;
	width: 100%;
	box-sizing: border-box;
`;

function App() {
	return (
		<>
			<GlobalStyles />
			<Container>
				<Row>
					<Row type="horizontal">
						<Header as="h1">The Wild Oasis</Header>
						<div>
							<Header as="h2">Check In and Out</Header>
							<Button
								variations="primary"
								sizes="medium"
								onClick={() => alert("Check In!")}
							>
								Check In
							</Button>

							<Button
								variations="secondary"
								sizes="medium"
								onClick={() => alert("Check Out!")}
							>
								Check Out
							</Button>
						</div>
					</Row>

					<Row>
						<Header as="h3">Form</Header>
						<form>
							<Input type="number" placeholder="Enter ID" />
							<Input type="text" placeholder="Enter Name" />
							<Button
								variations="danger"
								sizes="medium"
								onClick={() => alert("Submitted...")}
							>
								Submit
							</Button>
						</form>
					</Row>
				</Row>
			</Container>
		</>
	);
}

export default App;

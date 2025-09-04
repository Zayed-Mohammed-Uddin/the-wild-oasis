import {
	cloneElement,
	createContext,
	useCallback,
	useContext,
	useState,
} from "react";
import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: var(--color-grey-0);
	border-radius: var(--border-radius-lg);
	box-shadow: var(--shadow-lg);
	padding: 3.2rem 4rem;
	transition: all 0.5s;
	max-width: 90vw;
	max-height: 90vh;
	overflow-y: auto;

	/* Mobile styles */
	@media (max-width: 768px) {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 95vw;
		max-width: 95vw;
		max-height: 95vh;
		padding: 2.4rem 2rem;
		border-radius: var(--border-radius-md);
	}

	@media (max-width: 480px) {
		width: 98vw;
		max-width: 98vw;
		max-height: 98vh;
		padding: 2rem 1.6rem;
		border-radius: var(--border-radius-sm);
	}
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: var(--backdrop-color);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const CloseButton = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: var(--border-radius-sm);
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.5rem;

	&:hover {
		background-color: var(--color-grey-100);
	}

	& svg {
		width: 2.4rem;
		height: 2.4rem;
		color: var(--color-grey-500);
	}

	/* Mobile styles - larger touch target */
	@media (max-width: 768px) {
		top: 1rem;
		right: 1rem;
		padding: 0.8rem;

		& svg {
			width: 2.8rem;
			height: 2.8rem;
		}
	}

	@media (max-width: 480px) {
		top: 0.8rem;
		right: 0.8rem;
		padding: 1rem;

		& svg {
			width: 3rem;
			height: 3rem;
		}
	}
`;

const ModalContext = createContext();

function Modal({ children }) {
	const [openName, setOpenName] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const open = useCallback((name) => {
		setOpenName(name);
		setIsOpen(true);
	}, []);

	const close = useCallback(() => {
		setOpenName("");
		setIsOpen(false);
	}, []);

	return (
		<ModalContext.Provider value={{ openName, open, close, isOpen }}>
			{children}
		</ModalContext.Provider>
	);
}

function Open({ children, opens }) {
	const { open } = useContext(ModalContext);
	return <div onClick={() => open(opens)}>{children}</div>;
}

function Window({ name, children }) {
	const { openName, close, isOpen } = useContext(ModalContext);
	const ref = useOutsideClick(close);

	if (!isOpen || openName !== name) return null;

	return createPortal(
		<Overlay>
			<StyledModal ref={ref}>
				<CloseButton onClick={close}>
					<HiXMark />
				</CloseButton>
				<div>{cloneElement(children, { onCloseModal: close })}</div>
			</StyledModal>
		</Overlay>,
		document.body
	);
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

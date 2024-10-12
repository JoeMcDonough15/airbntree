import { createContext, useRef, useState, useContext } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext); // custom hook function to avoid extra imports across the app components that will use this context

export const ModalProvider = ({ children }) => {
  const modalRef = useRef();

  const [modalContent, setModalContent] = useState(null); // When the `modalContent` state variable is `null` or any falsey value,
  // that means the modal is closed. When it is set to a React component or any
  // truthy value, that means that the modal is open
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    setModalContent(null); // clear the modal contents
    // If stateful callback function is truthy, call the state setting function and reset the stateful function
    // to null for the following render.
    if (typeof onModalClose === "function") {
      setOnModalClose(null);
      onModalClose(); // ? It looks like we are calling null() but we aren't.  onModalClose will only be set to null on the next render, not immediately.
    }
  };

  const contextValue = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function to be called when modal is closing
    closeModal, // function to close the modal
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef}></div>
    </>
  );
};

export const Modal = () => {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);

  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={closeModal} />
      <div id="modal-content">{modalContent}</div>
    </div>,
    modalRef.current // this is the div that will accept the first div argument of ReactDOM.createPortal lines just above this one
  );
};

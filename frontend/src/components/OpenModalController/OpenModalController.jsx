import { useModal } from "../../context/Modal";

const OpenModalController = ({
  elementName, // type of element to render
  modalComponent, // component to render inside the modal
  controllerText, // text of the modal operator that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) => {
  const { setModalContent, setOnModalClose } = useModal();
  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return (
    <>
      {elementName === "li" ? (
        <li onClick={onClick}>{controllerText}</li>
      ) : elementName === "button" ? (
        <button onClick={onClick}>{controllerText}</button>
      ) : null}
    </>
  );
};

export default OpenModalController;

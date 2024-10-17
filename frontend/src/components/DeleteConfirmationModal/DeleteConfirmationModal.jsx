import { useModal } from "../../context/Modal";
import { deleteASpotThunk } from "../../store/spots";
import { deleteAReviewThunk } from "../../store/reviews";
import { useDispatch } from "react-redux";

const DeleteConfirmationModal = ({
  confirmationMessage,
  subjectType,
  subjectId,
}) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const handleDelete = () => {
    // depending on the subject passed in, call one of two thunks
    dispatch(
      subjectType === "spot"
        ? deleteASpotThunk(subjectId)
        : deleteAReviewThunk(subjectId)
    ).then((response) => {
      if (response.error) {
        window.alert(response.error);
      }
      closeModal();
    });
  };

  return (
    <>
      <div className="deleteConfirmationContainer modal-container">
        <h2>Confirm Delete</h2>
        <p>{`${confirmationMessage}`}</p>
        <div className="flex-container">
          <button
            onClick={handleDelete}
            className="full-width-button active-button"
          >
            {`Yes (Remove ${subjectType})`}
          </button>
          <button
            onClick={closeModal}
            className="full-width-button active-button dark-button"
          >
            {`No (Keep ${subjectType})`}
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmationModal;

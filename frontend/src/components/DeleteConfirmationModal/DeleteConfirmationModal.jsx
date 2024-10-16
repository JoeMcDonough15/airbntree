import { useModal } from "../../context/Modal";
import { deleteASpotThunk } from "../../store/spots";
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
    //   dispatch(
    //     subjectType === spot
    //       ? deleteASpotThunk(subjectId)
    //       : deleteAReviewThunk(subjectId)
    //   );
    // call thunk action to remove spot, using the subjectId as spotId
    dispatch(deleteASpotThunk(subjectId))
      .then(() => {
        closeModal();
      })
      .catch((rejected) => {
        console.log(rejected); // log any errors we get back if unsuccessful and do not close modal
      });
  };

  return (
    <>
      <div className="deleteConfirmationContainer">
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

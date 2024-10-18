import { useModal } from "../../context/Modal";
import { deleteASpotThunk, getSpotDetailsThunk } from "../../store/spots";
import { deleteAReviewThunk } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";

const DeleteConfirmationModal = ({
  confirmationMessage,
  subjectType,
  subjectId,
}) => {
  const dispatch = useDispatch();
  const currentSpot = useSelector((state) => state.spots.currentSpotDetails);
  const { closeModal } = useModal();
  const handleDelete = () => {
    // depending on the subject passed in, call one of two thunks
    dispatch(
      subjectType === "spot"
        ? deleteASpotThunk(subjectId)
        : deleteAReviewThunk(subjectId)
    ).then(() => {
      // dispatch the thunk to update the currentSpotDetails IF this is a review delete AND we're deleting it from a SpotDetailPage
      if (subjectType === "review" && currentSpot.id) {
        dispatch(getSpotDetailsThunk(currentSpot.id));
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

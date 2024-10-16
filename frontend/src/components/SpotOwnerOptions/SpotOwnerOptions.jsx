import { useNavigate } from "react-router-dom";
import OpenModalController from "../OpenModalController";
import DeleteConfirmationModal from "../DeleteConfirmationModal";

const SpotOwnerOptions = ({ spotId }) => {
  const navigate = useNavigate();
  const linkTo = `/spots/${spotId}/edit`;

  return (
    <div>
      <button
        onClick={() => {
          navigate(linkTo);
        }}
      >
        Update
      </button>

      <OpenModalController
        elementName="button"
        modalComponent={
          <DeleteConfirmationModal
            subjectId={spotId}
            confirmationMessage="Are you sure you want to remvove this spot from the listings?"
            subjectType="spot"
          />
        }
        controllerText="Delete"
        // onButtonClick // optional: callback function that will be called once the button that opens the modal is clicked
        // onModalClose// optional: callback function that will be called once the modal is closed
      />
    </div>
  );
};

export default SpotOwnerOptions;

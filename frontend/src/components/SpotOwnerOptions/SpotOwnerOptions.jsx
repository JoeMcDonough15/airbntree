import { useNavigate } from "react-router-dom";
import OpenModalController from "../OpenModalController";
import DeleteConfirmationModal from "../DeleteConfirmationModal";
import "./SpotOwnerOptions.css";

const SpotOwnerOptions = ({ spotId }) => {
  const navigate = useNavigate();
  const linkTo = `/spots/${spotId}/edit`;

  return (
    <div className="spot-owner-options flex-container">
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
      />
    </div>
  );
};

export default SpotOwnerOptions;

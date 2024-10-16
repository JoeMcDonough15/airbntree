import { useNavigate } from "react-router-dom";

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

      {/* open modal on delete */}
      <button>Delete</button>
    </div>
  );
};

export default SpotOwnerOptions;

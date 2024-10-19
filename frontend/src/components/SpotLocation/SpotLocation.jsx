import stateMap from "./stateMap";
import "./SpotLocation.css";

const SpotLocation = ({ city, state, country, abbreviateState }) => {
  const formatStateName = (nameOfState, abbreviate = false) => {
    if (
      (abbreviate && nameOfState.length > 2) ||
      (!abbreviate && nameOfState.length === 2)
    ) {
      nameOfState = stateMap[nameOfState];
      if (!nameOfState) {
        nameOfState = state.slice(0, 2).toUpperCase();
      }
    }
    return nameOfState;
  };

  if (state) {
    state = formatStateName(state, abbreviateState);
  }

  return (
    <div className="spot-location flex-container">
      <span className="city prevent-text-overflow">{city}</span>
      <span className="state prevent-text-overflow">, {state}</span>
      {country && (
        <span className="country prevent-text-overflow">, {country}</span>
      )}
    </div>
  );
};

export default SpotLocation;

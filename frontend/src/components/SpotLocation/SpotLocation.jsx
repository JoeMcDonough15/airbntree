import stateMap from "./stateMap";

const SpotLocation = ({ city, state, country, abbreviateState }) => {
  const formatStateName = (nameOfState, abbreviate = false) => {
    if (
      (abbreviate && nameOfState.length > 2) ||
      (!abbreviate && nameOfState.length === 2)
    ) {
      nameOfState = stateMap[nameOfState];
    }
    return nameOfState;
  };

  if (state) {
    state = formatStateName(state, abbreviateState);
  }

  return (
    <span className="spot-location">{`${city}, ${state} ${
      country ? `, ${country}` : ""
    }`}</span>
  );
};

export default SpotLocation;

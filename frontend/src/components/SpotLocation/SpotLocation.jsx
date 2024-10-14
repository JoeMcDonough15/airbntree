import stateMap from "./stateMap";

const SpotLocation = ({ city, state, country }) => {
  state = stateMap[state];
  return (
    <span className="spot-location">{`${city}, ${state} ${
      country ? `, ${country}` : ""
    }`}</span>
  );
};

export default SpotLocation;

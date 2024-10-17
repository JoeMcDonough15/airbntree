import stateMap from "./stateMap";

const SpotLocation = ({ city, state, country, showStateFullName }) => {
  return (
    <span className="spot-location">{`${city}, ${
      !showStateFullName ? stateMap[state] : state
    } ${country ? `, ${country}` : ""}`}</span>
  );
};

export default SpotLocation;

const SpotLocation = ({ city, state, country }) => {
  return (
    <span className="spot-location">{`${city}, ${state} ${
      country ? `, ${country}` : ""
    }`}</span>
  );
};

export default SpotLocation;

import "./TileImage.css";

const TileImage = ({ imageSrc, imageAltText }) => {
  return <img className="tile-image" src={imageSrc} alt={imageAltText} />;
};

export default TileImage;

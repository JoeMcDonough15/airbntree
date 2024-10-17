import { useSelector } from "react-redux";
import TileImage from "../TileImage";
import ImageRow from "./ImageRow";
import "./Gallery.css";

const Gallery = () => {
  const imagesArr = useSelector(
    (state) => state.spots.currentSpotDetails?.SpotImages
  );

  if (imagesArr?.length === 0) {
    return;
  }
  const imagesArrCopy = imagesArr?.slice(); // so we do not mutate state when we splice out the preview
  const featuredImageIdx = imagesArrCopy?.findIndex((image) => image.preview);
  const featuredImage = imagesArrCopy?.splice(featuredImageIdx, 1)[0]; // so we do not mutate state

  return (
    <div className="gallery flex-container">
      <div className="gallery-featured">
        <TileImage
          imageSrc={featuredImage?.url}
          imageAltText="featured image for this treehouse"
        />
      </div>
      <div className="gallery-unfeatured">
        {imagesArrCopy && (
          <>
            <ImageRow imageArr={[imagesArrCopy[0], imagesArrCopy[1]]} />
            <ImageRow imageArr={[imagesArrCopy[2], imagesArrCopy[3]]} />
          </>
        )}
      </div>
    </div>
  );
};

export default Gallery;

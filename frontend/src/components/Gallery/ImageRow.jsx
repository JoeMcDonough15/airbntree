import TileImage from "../TileImage";

const ImageRow = ({ imageArr }) => {
  console.log("image array inside ImageRow: ", imageArr);
  if (imageArr.length < 2) return;
  return (
    <div className="flex-container image-row">
      {imageArr.map((image, index) => {
        return (
          <div key={index}>
            {image && (
              <TileImage
                key={image.id}
                imageSrc={image.url}
                imageAltText="additional image of this treehouse"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ImageRow;

import { useSpotFormContext } from "../../context/SpotFormContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addImageToSpotThunk,
  deleteSpotImageThunk,
  createNewSpotThunk,
  editASpotThunk,
} from "../../store/spots";
import FormSection from "./FormSection";
import FormField from "./FormField";
import "./SpotForm.css";

export const SpotForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    spotToEdit,
    country,
    setCountry,
    address,
    setAddress,
    city,
    setCity,
    state,
    setState,
    description,
    setDescription,
    name,
    setName,
    price,
    setPrice,
    previewImageUrl,
    setPreviewImageUrl,
    spotImageTwoUrl,
    setSpotImageTwoUrl,
    spotImageThreeUrl,
    setSpotImageThreeUrl,
    spotImageFourUrl,
    setSpotImageFourUrl,
    spotImageFiveUrl,
    setSpotImageFiveUrl,
    userErrors,
    setUserErrors,
  } = useSpotFormContext();

  // required fields errors
  const requiredFields = {
    country: country,
    address: address,
    city: city,
    state: state,
    name: name,
    price: price,
    previewImageUrl: previewImageUrl,
  };

  // any image state in one iterable
  const spotImages = [
    previewImageUrl,
    spotImageTwoUrl,
    spotImageThreeUrl,
    spotImageFourUrl,
    spotImageFiveUrl,
  ];

  // ! Handle any errors before submitting
  const handleErrors = () => {
    const errors = {};

    Object.keys(requiredFields).forEach((requiredField) => {
      if (requiredFields[requiredField].length === 0) {
        errors[requiredField] = `${requiredField} is required`;
      }
    });

    // description length minimum error
    if (description.length < 30) {
      errors["description"] = "Description needs a minimum of 30 characters";
    }

    // name length maximum error
    if (name.length >= 50) {
      errors["name"] = "Name must be less than 50 characters";
    }

    // price must be non negative number error
    let priceAsNum = Number(price);
    if (isNaN(priceAsNum) || priceAsNum < 0) {
      errors["price"] = "Price must be a positive number";
    }

    const incorrectFileExtension = "Image URL must end in .png, .jpg, or .jpeg";
    spotImages.forEach((spotImage, index) => {
      if (
        !spotImage.endsWith(".png") &&
        !spotImage.endsWith(".jpg") &&
        !spotImage.endsWith(".jpeg")
      ) {
        if (index === 0 && spotImage.length > 0) {
          errors["previewImageUrl"] = incorrectFileExtension;
        } else if (spotImage.length > 0) {
          errors[`spotImage${index + 1}Url`] = incorrectFileExtension;
        }
      }
    });

    return errors;
  };

  // functions for creating and editing a spot
  const createASpot = async (spotDetails) => {
    const newSpot = await dispatch(createNewSpotThunk(spotDetails));
    return newSpot;
  };

  const deleteImagesAndEditSpot = async (spot, newSpotDetails) => {
    const imagesToDelete = spot.SpotImages;
    const imagePromises = imagesToDelete.map((spotImage) => {
      return dispatch(deleteSpotImageThunk(spotToEdit.id, spotImage));
    });
    const editedSpot = Promise.all(imagePromises).then(() => {
      return editASpot(spot, newSpotDetails);
    });

    return editedSpot;
  };

  const editASpot = async (spot, newSpotDetails) => {
    const editedSpot = await dispatch(editASpotThunk(spot.id, newSpotDetails));

    return editedSpot;
  };

  // ! Submitting the Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = handleErrors(); // this only checks for client side errors
    setUserErrors(errors); // if client side errors were fixed, this'll be an empty object, and will replace what was there from either client or server (remember all server side errors are being placed into the same keys as client side errors)
    if (Object.keys(errors).length > 0) {
      return;
    }

    const spotDetails = {
      country,
      address,
      city,
      state,
      lat: 27.234897234,
      lng: -73.3834583,
      description,
      name,
      price: Number(price),
    };

    let spot;

    if (spotToEdit) {
      spot = await deleteImagesAndEditSpot(spotToEdit, spotDetails);
    } else {
      spot = await createASpot(spotDetails);
    }

    if (spot.errors) {
      setUserErrors(spot.errors);
      return;
    }

    // ! Upload images to the spot
    const imagesToAddToSpot = spotImages.filter(
      (spotImageUrl) => spotImageUrl.length > 0
    );

    const imagePromises = imagesToAddToSpot.map((spotImageUrl, index) => {
      const spotImageObj = { url: spotImageUrl };
      if (index === 0) {
        spotImageObj.preview = true; // only the first image should have preview: true
      }

      return dispatch(addImageToSpotThunk(spot.id, spotImageObj));
    });

    // don't navigate until all images are added because thunks can run out of order and if we navigate to the SpotDetails page, our getSpotDetails thunk might run before the images are added to the new or edited spot.
    Promise.all(imagePromises).then(() => {
      navigate(`/spots/${spot.id}`);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormSection
        headerText="Where's your place located?"
        sectionDescription="Guests will only get your exact address once they booked a reservation."
      >
        <FormField
          labelText="Country"
          inputType="text"
          inputVal={country}
          setInputVal={setCountry}
          inputId="country-input"
          errorText={userErrors.country}
          errorIsInline
        />
        <FormField
          labelText="Street Address"
          inputType="text"
          inputVal={address}
          setInputVal={setAddress}
          inputId="address-input"
          errorText={userErrors.address}
          errorIsInline
        />
        <div className="flex-container">
          <FormField
            labelText="City"
            inputType="text"
            inputVal={city}
            setInputVal={setCity}
            inputId="city-input"
            errorText={userErrors.city}
            errorIsInline
          />
          <span style={{ alignSelf: "flex-end" }}>,</span>
          <FormField
            labelText="State"
            inputType="text"
            inputVal={state}
            setInputVal={setState}
            inputId="state-input"
            errorText={userErrors.state}
            errorIsInline
          />
        </div>
      </FormSection>
      <FormSection
        headerText="Describe your place to guests"
        sectionDescription="Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood."
      >
        <FormField
          labelText="Description"
          inputType="textarea"
          inputVal={description}
          setInputVal={setDescription}
          inputId="description-input"
          errorText={userErrors.description}
        />
      </FormSection>
      <FormSection
        headerText="Create a title for your spot"
        sectionDescription="Catch guests' attention with a spot title that highlights what makes your place special."
      >
        <FormField
          labelText="Name of your spot"
          inputType="text"
          inputVal={name}
          setInputVal={setName}
          inputId="name-input"
          errorText={userErrors.name}
        />
      </FormSection>
      <FormSection
        headerText="Set a base price for your spot"
        sectionDescription="Competitive pricing can help your listing stand out and rank higher in search results."
      >
        <FormField
          labelText="Price per night (USD)"
          inputType="number"
          inputVal={price}
          setInputVal={setPrice}
          inputId="price-input"
          errorText={userErrors.price}
        />
      </FormSection>
      <FormSection
        headerText="Liven up your spot with photos"
        sectionDescription="Submit a link to at least one photo to publish your spot."
      >
        <FormField
          labelText="Preview Image URL"
          inputType="text"
          inputVal={previewImageUrl}
          setInputVal={setPreviewImageUrl}
          inputId="preview-img-input"
          errorText={userErrors.previewImageUrl}
        />
        <FormField
          labelText="Image URL"
          inputType="text"
          inputVal={spotImageTwoUrl}
          setInputVal={setSpotImageTwoUrl}
          inputId="spot-image-two-input"
          errorText={userErrors.spotImage2Url}
        />
        <FormField
          labelText="Image URL"
          inputType="text"
          inputVal={spotImageThreeUrl}
          setInputVal={setSpotImageThreeUrl}
          inputId="spot-image-three-input"
          errorText={userErrors.spotImage3Url}
        />
        <FormField
          labelText="Image URL"
          inputType="text"
          inputVal={spotImageFourUrl}
          setInputVal={setSpotImageFourUrl}
          inputId="spot-image-four-input"
          errorText={userErrors.spotImage4Url}
        />
        <FormField
          labelText="Image URL"
          inputType="text"
          inputVal={spotImageFiveUrl}
          setInputVal={setSpotImageFiveUrl}
          inputId="spot-image-five-input"
          errorText={userErrors.spotImage5Url}
        />
      </FormSection>
      <button className="active-button">
        {`${spotToEdit ? "Update" : "Create"} Spot`}
      </button>
    </form>
  );
};

export default SpotForm;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getSpotDetailsThunk,
  createNewSpotThunk,
  deleteSpotImageThunk,
  addImageToSpotThunk,
} from "../../store/spots";
import FormSection from "./FormSection";
import FormField from "./FormField";
import "./SpotForm.css";

const SpotForm = () => {
  const { spotId } = useParams(); // will either be undefined if creating a new spot or will be the spotId of the spot to edit if editing a spot
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [spotImageTwoUrl, setSpotImageTwoUrl] = useState("");
  const [spotImageThreeUrl, setSpotImageThreeUrl] = useState("");
  const [spotImageFourUrl, setSpotImageFourUrl] = useState("");
  const [spotImageFiveUrl, setSpotImageFiveUrl] = useState("");
  const [userErrors, setUserErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ? Use effect hook to populate fields with data from a spot if we are updating one
  useEffect(() => {
    // if creating a new spot, get out of here!  Keep the fields as empty strings in the stateful inputs.
    if (!spotId) return;

    // if editing a spot that exists, we want to set that spot from the url to be the currentSpot
    // by dispatching a thunk action, and then use
    // the thunk's return value as the currentSpot to populate all of the stateful input fields

    dispatch(getSpotDetailsThunk(spotId)).then((currentSpot) => {
      // now call all of the state setting functions with the currentSpot's data
      const {
        country,
        address,
        city,
        state,
        description,
        name,
        price,
        SpotImages, // an array of objects where one is the preview
      } = currentSpot;
      setCountry(country);
      setAddress(address);
      setCity(city);
      setState(state);
      setDescription(description);
      setName(name);
      setPrice(price);
      setPreviewImageUrl(SpotImages.find((image) => image.preview).url);

      const otherImages = SpotImages.filter((image) => !image.preview);
      if (otherImages.length > 0) {
        setSpotImageTwoUrl(otherImages[0].url);
      }
      if (otherImages.length > 1) {
        setSpotImageThreeUrl(otherImages[1].url);
      }
      if (otherImages.length > 2) {
        setSpotImageFourUrl(otherImages[2].url);
      }
      if (otherImages.length > 3) {
        setSpotImageFiveUrl(otherImages[3].url);
      }
    });
  }, [
    spotId,
    dispatch,
    setCountry,
    setAddress,
    setCity,
    setState,
    setDescription,
    setName,
    setPrice,
    setPreviewImageUrl,
    setSpotImageTwoUrl,
    setSpotImageThreeUrl,
    setSpotImageFourUrl,
    setSpotImageFiveUrl,
  ]); // none of this data should change throughout the lifecycle of this SpotForm component

  // ? Handle any errors before submitting
  const handleErrors = () => {
    const errors = {};

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

    Object.keys(requiredFields).forEach((requiredField) => {
      if (requiredFields[requiredField].length === 0) {
        errors[requiredField] = `${requiredField} is required`;
      }
    });

    // description length minimum error
    if (description.length < 30) {
      errors["description"] = "Description needs a minimum of 30 characters";
    }

    // price must be non negative number error
    let priceAsNum = Number(price);
    if (isNaN(priceAsNum) || priceAsNum < 0) {
      errors["price"] = "Price must be a positive number";
    }

    // any image file extension error
    const spotImages = [
      previewImageUrl,
      spotImageTwoUrl,
      spotImageThreeUrl,
      spotImageFourUrl,
      spotImageFiveUrl,
    ];

    // const incorrectFileExtension = "Image URL must end in .png, .jpg, or .jpeg";
    // spotImages.forEach((spotImage, index) => {
    //   if (
    //     !spotImage.endsWith(".png") &&
    //     !spotImage.endsWith(".jpg") &&
    //     !spotImage.endsWith(".jpeg")
    //   ) {
    //     if (index === 0 && spotImage.length > 0) {
    //       errors["previewImageUrl"] = incorrectFileExtension;
    //     } else if (spotImage.length > 0) {
    //       errors[`spotImage${index + 1}Url`] = incorrectFileExtension;
    //     }
    //   }
    // });

    return errors;
  };

  // ? Handle the submission of the form, whether creating or updating
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
      description,
      name,
      price: Number(price),
      lat: 27.234897234, // hard coded for now, optional inputs for MVP
      lng: 73.3834583, // hard coded for now, optional inputs for MVP
    };

    let newOrEditedSpot;
    // submit the form to the backend, call a thunk action to update the DB and redux store
    if (!spotId) {
      newOrEditedSpot = await dispatch(createNewSpotThunk(spotDetails));
    } else {
      //   newOrEditedSpot = await dispatch(editASpotThunk(spotDetails));
    }

    if (newOrEditedSpot.errors) {
      console.log(
        "error response inside SpotForm after trying to create spot: ",
        newOrEditedSpot
      );
      setUserErrors(newOrEditedSpot.errors);
      return;
    }

    // ? Deal with images after spot is created/updated
    const spotImageData = [
      previewImageUrl,
      spotImageTwoUrl,
      spotImageThreeUrl,
      spotImageFourUrl,
      spotImageFiveUrl,
    ];

    if (spotId) {
      // if there's a spot id (if editing a spot), we need to delete the images that belong to currentSpot before we can upload these images to the db
      // we have to know that only one image can have preview: true.  We also don't want duplicate images.  There should also only ever be 5 images at most per spot.
      // For these reasons, it seems smart to delete all the images that are there, and then individually set each one from this form as the spot's images.  That way we'd guarantee
      // that only one (the one in the first input field for images) could be the previewImage.  And, there'd be no duplicates, and we'd never have more than 5 at a time.  This means:
      // 1) get all of the images that belong to currentSpot
      // 2) loop over them - //! Avoiding forEach as it doesn't support async
      // 3) dispatch a thunk action to go and delete those images from the DB
      // 4) we shouldn't need to worry about errors re: not finding the images because nothing has updated the currentSpotDetails to remove that spot or any of its images yet.
      // 5) once finished deleting all of them, we should be able to:

      for (let spotImage of newOrEditedSpot.SpotImages) {
        dispatch(deleteSpotImageThunk(newOrEditedSpot.id, spotImage));
      }
    }
    // ! Then, whether we are editing or creating, we must:

    // * 1) loop over all the images that we have in spotImageData - the ones we want to add
    // ! Avoiding forEach as it doesn't support async, using map so I can keep track of the index as well
    // * 2) dispatch a thunk action to add an image to a spot, using the spot's id from currentSpotDetails.id -- this should be either the newly created spot, or the newly edited spot.
    // * 3) only dispatch the action if the url's are not empty strings.

    spotImageData.map((spotImageUrl, index) => {
      const spotImageObj = { url: spotImageUrl };
      if (index === 0) {
        spotImageObj.preview = true; // only the first image should have preview: true
      }

      if (spotImageObj.url.length > 0) {
        // don't add any images that have empty strings for urls.  Remember, only the previewImageUrl is required; the others are optional!  The database will be mad if we send over nullish values for urls
        dispatch(addImageToSpotThunk(newOrEditedSpot.id, spotImageObj)); // ? This is making it to the DB!
      }
    });

    // * After adding the images (and deleting any that existed before if editing) we can finish creating/updating the spot by redirecting the user to the new spot's detail page
    navigate(`/spots/${newOrEditedSpot.id}`);
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
      <button className="active-button">Create Spot</button>
    </form>
  );
};

export default SpotForm;

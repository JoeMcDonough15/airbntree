import { useState } from "react";
import FormSection from "./FormSection";
import FormField from "./FormField";

const SpotForm = () => {
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [spotImageTwo, setSpotImageTwo] = useState("");
  const [spotImageThree, setSpotImageThree] = useState("");
  const [spotImageFour, setSpotImageFour] = useState("");
  const [spotImageFive, setSpotImageFive] = useState("");
  const [userErrors, setUserErrors] = useState({});

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
      previewImage: previewImage,
    };

    Object.keys(requiredFields).forEach((requiredField) => {
      if (requiredFields[requiredField].length === 0) {
        errors[requiredField] = `${requiredField} is required`;
      }
    });

    // description length minimum error
    if (description.length < 30) {
      errors[description] = "Description needs a minimum of 30 characters";
    }

    // any image file extension error
    const spotImages = [
      previewImage,
      spotImageTwo,
      spotImageThree,
      spotImageFour,
      spotImageFive,
    ];

    const incorrectFileExtension = "Image URL must end in .png, .jpg, or .jpeg";
    spotImages.forEach((spotImage, index) => {
      if (
        !spotImage.endsWith(".png") &&
        !spotImage.endsWith(".jpg") &&
        !spotImage.endsWith(".jpeg")
      ) {
        if (index === 0) {
          errors["previewImage"] = incorrectFileExtension;
        } else {
          errors[`spotImage${index + 1}`] = incorrectFileExtension;
        }
      }
    });

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = handleErrors();
    if (Object.keys(errors).length > 0) {
      setUserErrors(errors);
      return;
    }
    // submit the form to the backend, call a thunk action to update the DB and redux store
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
          inputVal={previewImage}
          setInputVal={setPreviewImage}
          inputId="preview-img-input"
          errorText={userErrors.previewImage}
        />
        <FormField
          labelText="Image URL"
          inputType="text"
          inputVal={spotImageTwo}
          setInputVal={setSpotImageTwo}
          inputId="spot-image-two-input"
          errorText={userErrors.spotImage2}
        />
        <FormField
          labelText="Image URL"
          inputType="text"
          inputVal={spotImageThree}
          setInputVal={setSpotImageThree}
          inputId="spot-image-three-input"
          errorText={userErrors.spotImage3}
        />
        <FormField
          labelText="Image URL"
          inputType="text"
          inputVal={spotImageFour}
          setInputVal={setSpotImageFour}
          inputId="spot-image-four-input"
          errorText={userErrors.spotImage4}
        />
        <FormField
          labelText="Image URL"
          inputType="text"
          inputVal={spotImageFive}
          setInputVal={setSpotImageFive}
          inputId="spot-image-five-input"
          errorText={userErrors.spotImage5}
        />
      </FormSection>
      <button className="active-button">Create Spot</button>
    </form>
  );
};

export default SpotForm;

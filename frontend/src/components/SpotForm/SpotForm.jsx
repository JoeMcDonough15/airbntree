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
  //   const [additionalImages, setAdditionalImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
          errorText="Country is required"
          errorIsInline
        />
        <FormField
          labelText="Street Address"
          inputType="text"
          inputVal={address}
          setInputVal={setAddress}
          inputId="address-input"
          errorText="Address is required"
          errorIsInline
        />
        <FormField
          labelText="City"
          inputType="text"
          inputVal={city}
          setInputVal={setCity}
          inputId="city-input"
          errorText="City is required"
          errorIsInline
        />
        <FormField
          labelText="State"
          inputType="text"
          inputVal={state}
          setInputVal={setState}
          inputId="state-input"
          errorText="State is required"
          errorIsInline
        />
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
          errorText="Description needs a minimum of 30 characters"
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
          errorText="Name is required"
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
          errorText="Price is required"
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
          inputId="preview-img-url-input"
          errorText="Preview image is required."
        />
      </FormSection>
      <button className="active-button">Create Spot</button>
    </form>
  );
};

export default SpotForm;

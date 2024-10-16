import { useDispatch } from "react-redux";
import { useSpotFormContext } from "../../context/SpotFormContext";
import { useEffect } from "react";
import SpotForm from "../SpotForm";

const CreateASpotPage = () => {
  const dispatch = useDispatch();
  const {
    setSpotToEdit,
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
  } = useSpotFormContext();

  // ! Reset Form Fields in case we're coming from EditASpotPage
  useEffect(() => {
    setSpotToEdit(undefined);
    setCountry("");
    setAddress("");
    setCity("");
    setState("");
    setDescription("");
    setName("");
    setPrice("");
    setPreviewImageUrl("");
    setSpotImageTwoUrl("");
    setSpotImageThreeUrl("");
    setSpotImageFourUrl("");
    setSpotImageFiveUrl("");
  }, [
    dispatch,
    setSpotToEdit,
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
  ]);

  return (
    <section className="create-edit-spot-page">
      <h1>Create a Spot</h1>
      <SpotForm />
    </section>
  );
};

export default CreateASpotPage;

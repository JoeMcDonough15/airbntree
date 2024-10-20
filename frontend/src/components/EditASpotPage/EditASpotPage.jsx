import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpotDetailsThunk } from "../../store/spots";
import { useSpotFormContext } from "../../context/SpotFormContext";
import SpotForm from "../SpotForm";
// import "./EditASpotPage.css";

const EditASpotPage = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const spotToEdit = useSelector((state) => state.spots.currentSpotDetails); // this might be different than the one that matches the spotId we're currently trying to edit when this component first mounts
  const user = useSelector((state) => state.session.user); // getting the current user so we can see if this user has permission to edit this spot
  const {
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
    setSpotToEdit,
    setUserErrors,
  } = useSpotFormContext();

  // ! Populate Form Fields
  useEffect(() => {
    setUserErrors({});
    dispatch(getSpotDetailsThunk(spotId)).then((currentSpot) => {
      const {
        country,
        address,
        city,
        state,
        description,
        name,
        price,
        SpotImages,
      } = currentSpot;

      setSpotToEdit(currentSpot);
      setCountry(country);
      setAddress(address);
      setCity(city);
      setState(state);
      setDescription(description);
      setName(name);
      setPrice(price);
      const previewImg = SpotImages.find((image) => image.preview);
      previewImg && setPreviewImageUrl(previewImg.url);

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
    setUserErrors,
  ]); // none of this data should change throughout the lifecycle of this SpotForm component

  if (
    // if currentSpotDetails is an empty object in state.spots
    Object.keys(spotToEdit).length === 0 ||
    // if the id of the currentSpotDetails spot is different than the one we're accessing
    spotToEdit.id !== Number(spotId) ||
    // if the user does not have authorization to edit this spot
    spotToEdit.ownerId !== user.id
  ) {
    return <h1>Cannot edit this spot</h1>;
  }

  return (
    <section className="create-edit-spot-page">
      <h1 className="spot-form-main-heading">Update your Spot</h1>
      <SpotForm />
    </section>
  );
};

export default EditASpotPage;

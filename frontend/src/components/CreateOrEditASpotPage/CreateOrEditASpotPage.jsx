import SpotForm from "../SpotForm";
import { useParams } from "react-router-dom";
import "./CreateOrEditASpotPage.css";

const CreateOrEditASpotPage = ({ headerText }) => {
  const { spotId } = useParams();
  return (
    <section className="create-a-spot-page ">
      <h1>{headerText}</h1>
      <SpotForm spotId={spotId} />
    </section>
  );
};

export default CreateOrEditASpotPage;

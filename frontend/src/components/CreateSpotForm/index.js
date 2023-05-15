import SpotForm from "../SpotForm";
import "./CreateSpotForm.css";

const CreateSpotForm = () => {
  const spot = {
    ownerId: 0,
    address: "",
    city: "",
    state: "",
    country: "",
    lat: null,
    lng: null,
    name: "",
    description: "",
    price: "",
  };

  return (
    <div className="new-spot-form-container">
      <h2>Create a new Spot</h2>
      <SpotForm spot={spot} formType="Create Spot" />
    </div>
  );
};

export default CreateSpotForm;

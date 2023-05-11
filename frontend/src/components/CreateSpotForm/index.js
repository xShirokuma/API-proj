import SpotForm from "../SpotForm";

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
    price: 0,
  };

  return (
    <div>
      <h1>Create a new Spot</h1>
      <SpotForm spot={spot} formType="Create Spot" />
    </div>
  );
};

export default CreateSpotForm;

import { useParams } from "react-router-dom";

const OwnerDetails = () => {
  const { id } = useParams();
  console.log(id);
  return <div className="owner-details-page">{id}</div>;
};

export default OwnerDetails;

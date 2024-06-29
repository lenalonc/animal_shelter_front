import Lottie from "lottie-react";
import animation from "../img/Animation - 1719702488768.json";
const NotFoundPage = () => {
  return (
    <div className="notFound" style={{backgroundColor: "#f5f5f5"}}>
      <div className="lottie-container">
        <Lottie animationData={animation} loop={false} autoplay={true}/>
      </div>
    </div>
  );
};

export default NotFoundPage;

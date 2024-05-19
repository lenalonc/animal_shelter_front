import mojs from "@mojs/core";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import api from "../../api/Api";
import { CPopover, CButton } from "@coreui/react";
import { Link } from "react-router-dom";

//TODO: handle that when a user thats not logged clicks heart it opens a pop up asking to login for liking pets

const HeartButton = ({ like, unlike, pet }) => {
  const [isActive, setIsActive] = useState(false);
  const { user } = useContext(UserContext);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const handleHeart = async () => {
      try {
        if (user.id) {
          const response = await api.get(`/owner/${user.id}/pet/${pet.id}`);
          //check if the user liked this pet
          if (response.data) {
            handleClick(true);
            //if he did set it to liked on the first render, by sending the flag that its already in db
          }
        } else {
          setShowLoginPopup(true);
        }
      } catch (err) {
        console.error("Error fetching pet details:", err);
      }
    };
    handleHeart();
  }, []);

  const handleClick = (isLiked) => {
    if (user.role === "customer") {
      setIsActive(!isActive);
      playAnimation();
      if (isActive) {
        // unlike
        unlike();
      } else {
        //like
        if (!isLiked) {
          like();
          //the pet isnt liked and is eing written into the db
        }
        //if it is liked no changes for db
      }
    } else {
      //when user is not loggedin
    }
  };

  const playAnimation = () => {
    const scaleCurve = mojs.easing.path(
      "M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0"
    );
    const el = document.querySelector(".button");
    const timeline = new mojs.Timeline();

    const tween1 = new mojs.Burst({
      parent: el,
      radius: { 0: 100 },
      angle: { 0: 45 },
      y: -10,
      count: 10,
      radius: 200,
      children: {
        shape: "circle",
        radius: 30,
        fill: ["#5e1914", "#f5f5f5"],
        strokeWidth: 15,
        duration: 500,
      },
    });

    const tween2 = new mojs.Tween({
      duration: 900,
      onUpdate: function (progress) {
        const scaleProgress = scaleCurve(progress);
        el.style.transform = `scale3d(${scaleProgress}, ${scaleProgress}, 1)`;
      },
    });

    const tween3 = new mojs.Burst({
      parent: el,
      radius: { 0: 100 },
      angle: { 0: -45 },
      y: -10,
      count: 10,
      radius: 125,
      children: {
        shape: "circle",
        radius: 30,
        fill: ["#8a251d", "#5e1914"],
        strokeWidth: 15,
        duration: 400,
      },
    });

    timeline.add(tween1, tween2, tween3);
    timeline.play();
  };

  const customPopoverStyle = {
    "--cui-popover-max-width": "1000px",
    "--cui-popover-border-color": "red",
    "--cui-popover-header-bg": "var(--cui-primary)",
    "--cui-popover-header-color": "var(--cui-white)",
    "--cui-popover-body-padding-x": "1rem",
    "--cui-popover-body-padding-y": ".5rem",
  };

  return (
    <div>
      {showLoginPopup && (
        <CPopover
          content={
            <div>
              <Link
                className="pop-link"
                to={"/login"}
                state={{ checked: true }}
              >
                <strong>Login</strong>
              </Link>{" "}
              or{" "}
              <Link
                className="pop-link"
                to={"/login"}
                state={{ checked: false }}
              >
                <strong>sign up</strong>{" "}
              </Link>
              to like a pet
            </div>
          }
          placement="right"
          title=""
        >
          <div
            id="heart"
            className={`button ${isActive ? "active" : ""}`}
            onClick={() => handleClick(false)}
          >
            {" "}
            {console.log("a")}
          </div>
        </CPopover>
      )}

      {!showLoginPopup && (
        <CButton
          id="heart"
          className={`button ${isActive ? "active" : ""}`}
          onClick={() => handleClick(false)}
        ></CButton>
      )}
    </div>
  );
};

export default HeartButton;

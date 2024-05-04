import mojs from "@mojs/core";
import { useState } from "react";

const HeartButton = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    playAnimation();
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

  return (
    <div
      id="heart"
      className={`button ${isActive ? "active" : ""}`}
      onClick={handleClick}
    ></div>
  );
};

export default HeartButton;

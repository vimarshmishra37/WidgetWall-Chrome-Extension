// import React from "react";
import Pomodoro from "../Components/pomodoro/Pomodoro";
import GoogleSlide from "../Components/googleslide/GoogleSlide";

const AllWidgets = () => {
  return <div className="relative py-10">
    <GoogleSlide />
    <Pomodoro />
  </div>;
};

export default AllWidgets;

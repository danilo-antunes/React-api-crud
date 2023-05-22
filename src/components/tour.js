import React from "react";
import JoyRide from "react-joyride";
const TOUR_STEPS = [
  {
    target: ".landingPage",
    content: "This is the Landing Page, where you can see every meter that you have registered.",
  },
  {
    target: ".newMeter",
    content: "By clicking on this button, you'll be able to create a new meter, it's very easy!",
  },
  {
    target: ".details",
    content:
      "By clicking here, you can see meter's details like creation date and when it was last updated.",
  },
  {
    target: ".edit",
    content:
      "If you need to change something, you can easily click here and Edit what's necessary. ",
  },
  {
    target: ".delete",
    content:
      "Sometimes things change and we need to adapt! Click here to delete the meter that's no longer necessary. But be careful, once deleted, there's no turning back! ",
  },
  {
    target: ".linkedin",
    content: "If you have any question, reach me on Linkedin, i'll be glad to help! ",
  },
];

const Tour = () => {
  return (
    <>
      <JoyRide
        steps={TOUR_STEPS}
        continuous={true}
        showSkipButton={true}
        showProgress={true}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },
          buttonNext: {
            backgroundColor: "green",
          },
          buttonBack: {
            marginRight: 10,
          },
        }}
      />
    </>
  );
};

export default Tour;

import React, { useState, useEffect } from "react";
import Nav from "./sections/Nav";
import Memes from "./sections/Memes";
import Assignments from "./sections/Assignments/Assignments.jsx";
import YoutubeVideos from "./sections/YoutubeVideos/YoutubeVideos";
import "../App.css";
import Gear from "./settings/Gear";

const images = require.context("../images/", true);
const imageList = images.keys().map((image) => images(image));
const checkBoxState = JSON.parse(localStorage.getItem("myCheckBox"));
const transitionTime = localStorage.getItem("transitionTime");

function Main() {
  const [imageIndex, setImageIndex] = useState(0);

  const [selectedTab, setSelectedTab] = useState("reddit");
  const [myCheckBox, setMyCheckBox] = useState(checkBoxState || false);
  const [transitionTimeState, setTransitionTimeState] = useState(
    transitionTime || 10000
  );

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Calculate the next image index in a sequential order
  //     const nextImageIndex = (imageIndex + 1) % imageList.length;
  //     setImageIndex(nextImageIndex);
  //   }, 10000);

  //   // Clear the interval on component unmount
  //   return () => clearInterval(interval);
  // }, [imageIndex]);
  useEffect(() => {
    const interval = setInterval(() => {
      if (myCheckBox) {
        // Calculate the next image index in a sequential order
        const nextImageIndex = (imageIndex + 1) % imageList.length;
        setImageIndex(nextImageIndex);
      }
    }, transitionTimeState);

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [imageIndex, myCheckBox]);

  useEffect(() => {
    console.log(checkBoxState);
  }, [checkBoxState]);

  const handleCheckBox = () => {
    console.log("handleCheckBox");
    setMyCheckBox(!myCheckBox);
    localStorage.setItem("myCheckBox", JSON.stringify(!myCheckBox));
  };

  const handleTransitionTime = (value) => {
    console.log("handleTransitionTime");
    setTransitionTimeState(value);
    localStorage.setItem("transitionTime", value);
  };

  const openTab = (url) => {
    window.open(url);
  };
  return (
    <div
      className={`App transition-container`}
      style={{
        backgroundImage: `url("${imageList[imageIndex].default}")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <div className="container">
        <Nav />
        <div>
          <div className="selectTab">
            <div
              className={selectedTab === "reddit" ? "selected" : "notSelected"}
              onClick={(e) => setSelectedTab(e.target.id)}
              id="reddit"
            >
              Reddit Memes
            </div>
            <div
              className={
                selectedTab === "assignments" ? "selected" : "notSelected"
              }
              onClick={(e) => setSelectedTab(e.target.id)}
              id="assignments"
            >
              Assignments
            </div>
            <div
              className={
                selectedTab === "youtubeVideos" ? "selected" : "notSelected"
              }
              onClick={(e) => setSelectedTab(e.target.id)}
              id="youtubeVideos"
            >
              Youtube Videos
            </div>
          </div>
        </div>

        <div>
          <div className="selectTab">
            <div
              className={`
                customButton ${
                  selectedTab === "youtubeVideos" ? "selected" : "notSelected"
                }
                `}
              onClick={() =>
                openTab(
                  "https://docs.google.com/document/d/1Xy1EyqVmuiGzRCrDOFsvX9okyX5e4dyToeFC_vBAr-U/edit"
                )
              }
              id="googleDocs"
            >
              <div style={{ color: "red", fontWeight: "bold" }}>(notes)</div>{" "}
              google docs
            </div>
          </div>
        </div>

        {selectedTab == "reddit" ? (
          <Memes />
        ) : selectedTab == "assignments" ? (
          <Assignments imageURL={imageList[imageIndex].default} />
        ) : selectedTab == "youtubeVideos" ? (
          <YoutubeVideos />
        ) : null}
      </div>

      <Gear
        myCheckBox={myCheckBox}
        setMyCheckBox={setMyCheckBox}
        handleCheckBox={handleCheckBox}
        transitionTimeState={transitionTimeState}
        handleTransitionTime={handleTransitionTime}
      />
    </div>
  );
}

export default Main;

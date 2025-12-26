import React, { useEffect, useRef, useState } from "react";
import Arrow from "./arrow.png";

function getDominantColorFromImage(imageUrl, callback) {
  const img = new Image();
  img.crossOrigin = "anonymous"; // Enable cross-origin requests if necessary
  img.src = imageUrl;

  img.onload = function () {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, img.width, img.height);

    const imageData = ctx.getImageData(0, 0, img.width, img.height).data;

    // Calculate the dominant color (you can implement your logic here)
    // For simplicity, we'll just get the average color of the entire image
    let totalRed = 0;
    let totalGreen = 0;
    let totalBlue = 0;
    let pixelCount = 0;

    for (let i = 0; i < imageData.length; i += 4) {
      totalRed += imageData[i];
      totalGreen += imageData[i + 1];
      totalBlue += imageData[i + 2];
      pixelCount++;
    }

    const avgRed = Math.floor(totalRed / pixelCount);
    const avgGreen = Math.floor(totalGreen / pixelCount);
    const avgBlue = Math.floor(totalBlue / pixelCount);

    const dominantColor = `rgb(${avgRed},${avgGreen},${avgBlue},0.15)`;

    callback(dominantColor);
  };
}
function Schedule({ courses, convertUTCToPST, imageURL }) {
  // Function to render a single submission
  function renderSubmission(task) {
    return (
      <div className="submissionDiv">
        <div className="submissionURL">
          URL:
          <a href={task.html_url} target="_blank">
            {task.name}
          </a>
        </div>
        <div className="submissionDueDate">
          due date: {convertUTCToPST(task.due_at)}
        </div>
      </div>
    );
  }

  // Function to render a single assignment
  function renderAssignment(assignment, toggle, index) {
    return (
      <div className="assignmentDiv">
        <div className="assignmentTitle">
          <div>{assignment.name}</div>
          <div style={{ marginLeft: "20px", overflow: "hidden" }}>
            {toggle[index]?.state ? <div>pain</div> : null}
            {assignment.submissions.map((task) => renderSubmission(task))}
          </div>
        </div>
      </div>
    );
  }

  const ToggleButton = ({ toggle, toggleFunction, index, myClass }) => {
    return (
      <div>
        <div className="courseTitle">
          <div className="courseName">{myClass.name}</div>
          <div
            className="arrowContainer"
            id={index}
            onClick={(e) => toggleFunction(index)}
          >
            <img
              src={Arrow}
              alt="arrow"
              className={`arrowImg ${toggle[index]?.state ? "arrowUp" : null}`}
            />
          </div>
        </div>
        <div
          style={{ marginLeft: "20px", overflow: "hidden" }}
          className={`${toggle[index]?.state ? "collaps" : null}`}
        >
          {myClass.assignments.map((assignment) =>
            renderAssignment(assignment, toggle, index)
          )}
        </div>
      </div>
    );
  };

  // Function to render the list of courses
  function renderCourses(courses) {
    const [backgroundColor, setBackgroundColor] = useState("transparent");
    const containerRef = useRef(null);

    const [toggle, setToggle] = useState([]);

    const toggleFunction = (buttonID) => {
      console.log(buttonID);
      setToggle(
        toggle.map((item, index) => {
          if (index == buttonID) {
            return { state: !item.state };
          } else {
            return item;
          }
        })
      );
    };

    useEffect(() => {
      const storedData = localStorage.getItem("toggleState");

      if (!storedData) {
        for (let i = 0; i < courses.length; i++) {
          setToggle((prev) => [...prev, { id: i, state: false }]);
        }
      } else {
        const parsedData = JSON.parse(storedData);
        setToggle(parsedData);
      }
    }, [courses]);

    useEffect(() => {
      console.log(toggle);

      if (toggle?.length > 0) {
        console.log(toggle);
        // Convert the array to a JSON string
        const jsonString = JSON.stringify(toggle);

        // Store the JSON string in localStorage with a key
        localStorage.setItem("toggleState", jsonString);
      }
    }, [toggle]);

    useEffect(() => {
      const container = containerRef.current;

      if (container) {
        console.log("imageURL", imageURL);
        const imageUrl = imageURL; // Replace with your image URL
        getDominantColorFromImage(imageUrl, (color) => {
          setBackgroundColor(color);
        });
      }
    }, [imageURL]);

    useEffect(() => {
      console.log("imageURL", imageURL);
      const imageUrl = imageURL; // Replace with your image URL
      getDominantColorFromImage(imageUrl, (color) => {
        setBackgroundColor(color);
      });
    }, []);

    return (
      <div className="courseContainer">
        {courses.map((myClass, index) => {
          return (
            <div className="courseDiv" key={myClass.name}>
              <div
                className="courseInnerDiv"
                ref={containerRef}
                style={{ backgroundColor }}
              >
                <div>
                  <ToggleButton
                    toggle={toggle}
                    toggleFunction={toggleFunction}
                    index={index}
                    myClass={myClass}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return renderCourses(courses);
}

export default Schedule;

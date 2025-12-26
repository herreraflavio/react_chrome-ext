import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Assignments.css";
import Schedule from "./components/Schedule";

function Assignments({ imageURL }) {
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    const response = await axios.get("http://localhost:4000/courses", {
      withCredentials: true, // This instructs Axios to include cookies in the request
    });
    console.log(response.data.courses);
    setCourses(response.data.courses);
  };

  function convertUTCToPST(timestamp) {
    return new Date(timestamp).toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    });
  }

  useEffect(() => {
    getCourses();
  }, []);
  return (
    <div className="outerCourseContainer">
      <div className="containerTitle">Pending Canvas Assignments</div>
      <div className="courseContainer">
        <Schedule
          courses={courses}
          convertUTCToPST={convertUTCToPST}
          imageURL={imageURL}
        />
      </div>
    </div>
  );
}

export default Assignments;

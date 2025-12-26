// import React, { useEffect } from "react";
// const axios = require("axios");
// function YoutubeVidoes() {
//   let config = {
//     method: "get",
//     maxBodyLength: Infinity,
//     url: "http://localhost:3050/videoFiles/79159287.mp4",
//     headers: {},
//   };

//   useEffect(() => {
//     axios
//       .request(config)
//       .then((response) => {
//         console.log(JSON.stringify(response.data));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return <div>YoutubeVidoes</div>;
// }

// export default YoutubeVidoes;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./YoutubeVideos.css";

function YoutubeVideos() {
  //   const [memes, setMemes] = useState([]);
  const [videos, setVideos] = useState([]);
  const getVideos = async () => {
    const response = await axios.get("http://localhost:3050/api/videos", {
      withCredentials: true,
    });
    // console.log(response.data.memes);
    // setMemes(response.data.memes);
    setVideos(response.data);
    console.log(response);
  };

  useEffect(() => {
    getVideos();
  }, []);
  return (
    <div>
      <div className="">youtube videos</div>
      <div className="videosContainer">
        {videos.map((video) => {
          return (
            <div className="videoDiv">
              <div className="videoTitle">{video.name}</div>
              <div className="videoImageDiv">
                <video
                  src={`http://localhost:3050${video.url}`}
                  controls
                  className="videoImage"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default YoutubeVideos;

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

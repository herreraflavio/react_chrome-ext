import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Memes.css";

function Memes() {
  const [memes, setMemes] = useState([]);

  const getMemes = async () => {
    const urls = [
      "https://hackerflavio.com/memes",
      "http://localhost:4000/memes",
      "http://192.168.1.122:4000/memes",
      "http://10.56.184.6:4000/memes",
    ];

    const cancelTokens = urls.map(() => axios.CancelToken.source());

    try {
      const response = await Promise.race(
        urls.map((url, index) =>
          axios.get(url, {
            withCredentials: true, // Include cookies in the request
            cancelToken: cancelTokens[index].token, // Associate cancel token
          })
        )
      );

      // Check if the response status is 200 and if it contains the memes object
      if (response.status === 200 && response.data && response.data.memes) {
        // Cancel the other requests
        cancelTokens.forEach((tokenSource, index) => {
          if (tokenSource.token !== response.config.cancelToken) {
            tokenSource.cancel(
              `Request to ${urls[index]} was canceled because another request completed first.`
            );
          }
        });

        console.log(`Successfully fetched memes from: ${response.config.url}`);
        setMemes(response.data.memes); // Set the memes data from the successful request
      } else {
        throw new Error(
          "Response did not return with a status of 200 or did not include memes object."
        );
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.warn(`Request canceled: ${error.message}`);
      } else {
        console.error("Failed to fetch memes from all provided URLs.", error);
      }
    }

    console.error("Failed to fetch memes from all provided URLs.");
  };

  useEffect(() => {
    getMemes();
  }, []);

  return (
    <div className="outerMemesContainer">
      <div className="containerTitle">Top 20 Memes From r/Memes</div>
      <div className="memesContainer">
        {memes.map((meme) => {
          return (
            <div className="memeDiv" key={meme.id}>
              <div className="memeTitle">{meme.title}</div>
              <div className="memeImageDiv">
                <img src={meme.url} alt={meme.title} className="memeImage" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Memes;

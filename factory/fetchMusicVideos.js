import fs from "fs";
import dotenv from "dotenv";
import axios from "axios";

const configuration = dotenv.config().parsed;

if (!configuration.YTKEY || !configuration.MUSICSIZE) {
  throw new Error("Environment variables not found!");
}

const BASE_PATH = "https://www.googleapis.com/youtube/v3/search?";
const MAX_RESULTS = 50; // this must be lower than 50
const QUERY = "COVER";

let videos = [];
let currentPageToken = null;
let totalFetched = 0;

function getRequestURL() {
  const musicRemaining = configuration.MUSICSIZE - totalFetched;
  const maxResults =
    musicRemaining > MAX_RESULTS ? MAX_RESULTS : musicRemaining;
  const request = `${BASE_PATH}part=snippet&maxResults=${maxResults}&q=${QUERY}&key=${
    configuration.YTKEY
  }`;
  const finalRequest = !currentPageToken
    ? request
    : `${request}&pageToken=${currentPageToken}`;
  return finalRequest;
}

const startFetching = async () => {
  do {
    const requestURL = getRequestURL();
    console.log(requestURL);
    try {
      const json = (await axios.get(requestURL)).data;
      const {
        items,
        nextPageToken,
        pageInfo: { resultsPerPage }
      } = json;

      const curatedResults = items.map(r => ({
        videoURL: `https://youtube.com/watch?v=${r.id.videoId}`,
        title: r.snippet.title,
        description: r.snippet.description,
        thumbnail: r.snippet.thumbnails.default.url
      }));
      videos = [...videos, ...curatedResults];
      totalFetched += resultsPerPage;
      currentPageToken = nextPageToken;
      console.log(`adding ${resultsPerPage} music videos`);
      console.log(`Total Music Fetched: ${totalFetched}`);
    } catch (err) {
      throw new Error(err);
    }
  } while (totalFetched < configuration.MUSICSIZE);
};

startFetching()
  .then(() => {
    const JSONStream = JSON.stringify(videos, null, 2);
    console.log(`SUCCESS: Total Music Fetched: ${videos.length}`);
    fs.writeFile("videos.json", JSONStream, "utf8", err => {
      if (err) {
        throw new Error(err.message);
      }
    });
  })
  .catch(err => {
    throw new Error(err);
  });

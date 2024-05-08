const { textToSpeech } = require("./azure-cognitiveservices-speech");

const express = require("express");
const app = express();
const port = 3000;

// Define a route that handles GET requests to the root URL
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// creates a temp file on server, the streams to client
/* eslint-disable no-unused-vars */
app.get("/text-to-speech", async (req, res, next) => {
  const { phrase, file } = req.query;

  if (!key || !region || !phrase) res.status(404).send("Invalid query string");

  let fileName = null;

  // stream from file or memory
  if (file && file === true) {
    fileName = `./temp/stream-from-file-${timeStamp()}.mp3`;
  }

  const audioStream = await textToSpeech(key, region, phrase, fileName);
  res.set({
    "Content-Type": "audio/mpeg",
    "Transfer-Encoding": "chunked",
  });
  audioStream.pipe(res);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

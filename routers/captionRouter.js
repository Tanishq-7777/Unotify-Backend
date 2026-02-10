const express = require("express");
const captionsRouter = express.Router();
const axios = require("axios");
const User = require("../models/user");
const Captions = require("../models/captions");
const { authUser } = require("../authentication/authUser");
const getAiData = require("../openaiApi/openApi");
const getCaptions = async (ytId) => {
  const options = {
    method: "GET",
    url: `https://youtube-captions-transcript-subtitles-video-combiner.p.rapidapi.com/download-json/${ytId}`,
    params: {
      language: "en",
      response_mode: "url",
    },
    headers: {
      "x-rapidapi-key": "8a75c35cd3msh47bea06b172383ep17e501jsn190ac1c2224e",
      "x-rapidapi-host":
        "youtube-captions-transcript-subtitles-video-combiner.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);

    const text = response.data.map((item) => item.text.trim()).join(" ");

    return text;
  } catch (error) {
    throw new Error(error.message);
  }
};

captionsRouter.post("/getNotes", authUser, async (req, res) => {
  try {
    const { ytId } = req.body;
    const { _id } = req.user;
    const captionsFound = await Captions.findOne({ videoId: ytId });
    if (!captionsFound) {
      const text = await getCaptions(ytId);
      console.log(text);

      const aiResponse = await getAiData(text);
      const captions = new Captions({
        userId: _id,
        videoId: ytId,
        text,
        aiResponse,
      });
      res.json({
        data: captions,
      });
      await captions.save();
    } else {
      res.json({
        data: captionsFound,
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = captionsRouter;

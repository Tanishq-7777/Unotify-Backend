const express = require("express");
const Jobs = require("../models/jobs");
const jobRouter = express.Router();
jobRouter.get("/jobTitles", async (req, res) => {
  const { title } = req.query;
  const data = await Jobs.find({
    job_title: { $regex: title, $options: "i" },
  })
    .limit(5)
    .select("job_title");
  res.send(data);
});
jobRouter.get("/jobTitles/:title", async (req, res) => {
  const { title } = req.params;
  const data = await Jobs.find({
    job_title: { $regex: title, $options: "i" },
  });
  res.json({
    data: data,
  });
});
module.exports = jobRouter;

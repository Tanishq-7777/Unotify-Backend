const axios = require("axios");
const Jobs = require("../models/jobs");
const options = {
  method: "GET",
  url: "https://jsearch.p.rapidapi.com/search",
  params: {
    query: "Systems Engineer Network Engineer Database Administrator (DBA)",
    country: "in",
    date_posted: "all",
  },
  headers: {
    "x-rapidapi-key": "8a75c35cd3msh47bea06b172383ep17e501jsn190ac1c2224e",
    "x-rapidapi-host": "jsearch.p.rapidapi.com",
  },
};
const getJobs = async () => {
  try {
    const response = await axios.request(options);
    const jobList = response?.data?.data;

    for (const job of jobList) {
      const {
        job_id,
        job_title,
        employer_website,
        employer_name,
        employer_logo,
        job_publisher,
        job_employment_type,
        job_apply_link,
        job_description,
        job_is_remote,
        job_location,
      } = job;

      // avoid duplicates
      const exists = await Jobs.findOne({ job_id });
      if (exists) continue;

      await Jobs.create({
        job_id,
        job_title,
        employer_name,
        employer_logo,
        employer_website,
        job_publisher,
        job_employment_type,
        job_apply_link,
        job_description,
        job_is_remote,
        job_location,
      });
    }

    console.log("Jobs saved successfully");
  } catch (error) {
    console.error(error);
  }
};

module.exports = getJobs;

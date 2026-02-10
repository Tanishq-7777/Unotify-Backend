const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
  job_id: {
    type: String,
  },
  job_title: {
    type: String,
  },
  employer_website: {
    type: String,
  },
  employer_name: {
    type: String,
  },
  employer_logo: {
    type: String,
  },
  job_publisher: {
    type: String,
  },
  job_employment_type: {
    type: String,
  },
  job_apply_link: {
    type: String,
  },
  job_description: {
    type: String,
  },
  job_is_remote: {
    type: String,
  },
  job_location: {
    type: String,
  },
});

module.exports = mongoose.model("Jobs", jobSchema);

const express = require("express");
const companyModel = require("../models/companyModel.js");
const router = express.Router();
let content = "";
const apiKey = process.env.API_KEY;                   ;
router.use(express.json());
router.get("/:company", async (req, res) => {
  const company = req.params.company;
  const result = await companyModel.findOne({ name: company });
  if (result) {
    topics = result.InterviewTopics.split(",").map((topic) => topic.trim());
    res.render("interview", {
      topics: topics,
      name: company,
      apiKey: apiKey,
    });
  } else {
    res.render("coming_soon");
  }
});
router.get("/questions/resume", async (req, res) => {
  if (!content || content.trim() === "") {
    // If content is empty, redirect to upload page or show an error
    return res.redirect("/interview/upload/resume");
  }

  const topics = [
    "first skill",
    "experience",
    "project",
    "other skill",
    "other project",
  ];

  // Proceed to render the interview-resume page
  res.render("interview-resume", {
    content: content,
    topics: topics,
    apiKey: apiKey,
  });
});

router.get("/upload/resume", async (req, res) => {
  res.render("resume-upload");
});
router.post("/upload/resume", async (req, res) => {
  console.log("Received content:", req.body.content); // Debug input
  content = req.body.content;
  console.log("Redirecting to /questions/resume");
  res.redirect("/interview/questions/resume");
});

module.exports = router;

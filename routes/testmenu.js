const express = require("express");
const router = express.Router();
const CompanyModel = require("../models/companyModel");

const question_type = ["Resume-Based", "Skill-based"];
const test_images = [
  "https://media.istockphoto.com/id/1184801139/vector/online-testing-e-learning-education-concept-people-are-studying-the-application-form-vector.jpg?s=612x612&w=0&k=20&c=l2QTjm2VueMmbkG4Q34nqtem3t4N4ECO_Wo7jPfKaFY=",
  "https://img.freepik.com/free-vector/choosing-best-candidate-concept_52683-43377.jpg?t=st=1723386436~exp=1723390036~hmac=ba6ee707d420743858a75a66ed77e6317cc22efc5e9e6634567d892c280d3ede&w=1380",
];

router.get("/:company", async (req, res) => {
  try {
    const title = req.params.company;
    const company = await CompanyModel.findOne({ name: title });
    if (company && company.code !== "") {
      console.log("Test menu loaded successfully");
      res.render("testmenu.ejs", {
        types: question_type,
        images: test_images,
        title: title,
        code: company.code,
      });
    } else {
      res.redirect("/comingsoon");
    }
  } catch (error) {
    res.redirect("/comingsoon");
  }
});

module.exports = router;

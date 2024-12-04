const express = require("express");
const router = express.Router();
const CompanyModel = require("../models/companyModel");

router.get("/:types", async (req, res) => {
  list = [];
  title = req.params.types;
  const result = await CompanyModel.find();
  result.forEach((element) => {
    if (element.Type == title) {
      list.push({
        name: element.name,
        logo: element.logo,
        about: element.about,
        package: element.package,
        des: element.info,
      });
    }
  });
  res.render("company.ejs", { companies: list, title: title });
});

module.exports = router;

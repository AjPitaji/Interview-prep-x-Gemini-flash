const express = require("express");
const router = express.Router();
const marquee = "https://i.ibb.co/YNT2Q9Y/marquee-company.jpg";
const super_dream = "https://i.ibb.co/hdCbBc0/76.jpg";
const dream = "https://i.ibb.co/QkBr66c/51584.jpg";
const Day = "https://i.ibb.co/2cr5c6W/Illustration05.jpg";

let marqueedes =
  "Marquee company refers to a highly successful and well-known business organization that is usually dominant in its respective industry.";
let superdes =
  "The companies whoever offer above 10 LPA will be considered as Super Dream companies.";
let dreamdes =
  "A dream company is an organization that can help you lead a meaningful life and enjoy a rewarding career.";
let dsdes =
  "These companies are organizations that want to employ a large number of individuals as opposed to other companies that only hire a few.";

const typese = [
  { type: "Marquee Company", image: marquee, description: marqueedes },
  { type: "Super Dream Company", image: super_dream, description: superdes },
  { type: "Dream Company", image: dream, description: dreamdes },
  { type: "Day Sharing", image: Day, description: dsdes },
];

router.get("/", function (req, res) {
  // Render the template with the appropriate partial
  res.render("home.ejs", {
    types: typese,
  });
});
module.exports = router;

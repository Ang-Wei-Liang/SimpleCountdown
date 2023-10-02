const express = require("express");
const router = express.Router();
const path = require("path");

// Import the EJS module
const ejs = require("ejs");

router.get("/", async (req, res, next) => {
  const filePath = path.join(__dirname, "views", "index.html");
  return res.sendFile(filePath);
});

/*
router.get("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "The app is working properly!",
  });
});*/

module.exports = router;



/*router.get("/home", async (req, res, next) => {
  // Render the "home.ejs" template
  console.log("home reached")
  const templatePath = path.join(__dirname, "views", "index.ejs");
  ejs.renderFile(templatePath, { title: "Express Testing" }, (err, html) => {
    if (err) {
      console.error("Error rendering EJS template:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.send(html);
  });
});*/

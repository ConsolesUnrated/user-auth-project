const express = require("express");
const path = require("path");
const router = express.Router();
const { validateToken } = require("../middleware/validation");

router.get("/download", validateToken, (req, res) => {
  const filePath = path.join(__dirname, "../static/secret_company_file.txt");
  res.download(filePath, "secret_company_file.txt", (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Download failed.");
    }
  });
});

module.exports = router;

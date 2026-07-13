const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

console.log("AUTH ROUTES FILE LOADED");

router.get("/", (req, res) => {
  res.send("AUTH ROOT WORKS");
});

router.get("/hello", (req, res) => {
  res.json({
    success: true,
    message: "Hello Route Works!",
  });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
const express = require("express");
const router = express.Router();
const passport = require("../controllers/authController");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failure",
  }),
  (req, res) => {
    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect(`${process.env.FRONTEND_URL}`);
  });
});

router.get("/current-user", (req, res) => {
  res.send(req.user);
});

router.get("/login-failure", (req, res) => {
  res.status(401).json({ success: false, message: "Authentication failed" });
});

module.exports = router;
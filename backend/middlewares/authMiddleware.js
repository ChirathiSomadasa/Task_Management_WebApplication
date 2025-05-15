module.exports = (req, res, next) => {
  console.log("Checking authentication...");
  console.log("Session:", req.session);
  console.log("User:", req.user);

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};
// Modules
const path = require("path");
const router = require("express").Router();
const passport = require("../config/authentication");

// Setup route to redirect to google to authenticate 
router.get('/auth/google',
// scope looks for which kind of data to use to verify and authenticate
  passport.authenticate('google', { scope: ['profile'] }));

  // Callback route used after token is authenticated 
router.get('/auth/google/callback', 
  passport.authenticate('google'),
  (req, res) => {
    res.sendFile(path.join(__dirname, "../public/secret.html"));
  });

  // Facebook Auth Route
  router.get("/auth/facebook", passport.authenticate("facebook"));

  // Facebook Auth Route Callback
  router.get("/auth/facebook/callback", passport.authenticate("facebook"), (req, res) => {
    res.sendFile(path.join(__dirname, "../public/secret.html"));
  });

// Logout route to deserialize
router.get("/logout", (req,res) => {
    req.logOut();
    res.sendFile(path.join(__dirname, "../public/index.html"));
})


module.exports = router;
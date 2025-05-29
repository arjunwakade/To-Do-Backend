const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", 
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("https://to-do-frontend-jwdu.onrender.com");
  }
);

router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).send('Logout error');
    res.redirect('https://to-do-frontend-jwdu.onrender.com'); // redirect to frontend
  });
});

router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ msg: 'Not logged in' });
  }
});

module.exports = router;

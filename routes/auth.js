const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/google", (req, res, next) => {
  console.log("HIT /auth/google");
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
});

router.get("/google/callback", 
  (req, res, next) => {
    console.log("HIT /auth/google/callback");
    next();
  },
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    console.log("User after Google login:", req.user);
    res.redirect("https://to-do-frontend-jwdu.onrender.com");
  }
);

router.get("/logout", (req, res) => {
  req.logout(err => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send('Logout error');
    }
    res.redirect('https://to-do-frontend-jwdu.onrender.com');
  });
});

router.get('/user', (req, res) => {
  console.log("Session ID:", req.sessionID);
  console.log("Session:", req.session);
  console.log("User in /auth/user:", req.user);
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ msg: 'Not logged in' });
  }
});

module.exports = router;

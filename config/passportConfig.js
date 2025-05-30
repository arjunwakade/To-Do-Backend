const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

passport.serializeUser((user, done) => {
  done(null, user.id); // use MongoDB _id
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://to-do-backend-q9sw.onrender.com/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("Google profile:", profile);
    try {
      let existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) return done(null, existingUser);

      const newUser = new User({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value
      });

      await newUser.save();
      done(null, newUser);
    } catch (err) {
      console.error("Passport strategy error:", err); // <-- Add this
      done(err, null);
    }
  }
));


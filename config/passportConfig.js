const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User.js");

passport.serializeUser((user, done) => {
  done(null, user.googleId); // or user.id or user.googleId, depending on your schema
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ googleId: id }); // or findOne({ googleId: id }) if you use googleId
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://to-do-backend-q9sw.onrender.com/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
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


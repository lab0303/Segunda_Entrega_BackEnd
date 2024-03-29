const passport = require("passport");
const local = require("passport-local");
const GithubStrategy = require("passport-github2");
const jwt = require("passport-jwt");
const Users = require("../dao/models/User.model.js");
const { createHash, isValidPassword } = require("../utils/cryptPassword.utils");
const cookieExtractor = require("../utils/cookieExtractor.utils.js");
const Carts = require("../dao/models/Carts.model.js");

const LocalStrategy = local.Strategy;

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        try {
          const { firstName, lastName, email, age, password } = req.body;
          const user = await Users.findOne({ email: username });
          if (user) {
            console.log("Usuario existente");
            return done(null, false);
          }
          const cart = new Carts();
          await cart.save();
          const cartId = cart._id;
          const newUserInfo = {
            firstName,
            lastName,
            email,
            age,
            password: createHash(password),
            cartId,
          };

          const newUser = await Users.create(newUserInfo);
          done(null, newUser);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await Users.findOne({ email: username });
          if (!user) {
            console.log("El usuario no existe");
            return done(null, false);
          }
          if (!isValidPassword(password, user)) return done(null, false);
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "Iv1.b530f5e305970140",
        clientSecret: "528bd8d0a42d70a447aeb459b7f1a9c0d3d19267",
        callbackURL: "http://localhost:8080/auth/githubcallback",
      },
      async (accesToken, refreshtoken, profile, done) => {
        try {
          const user = await Users.findOne({ email: profile._json.email });
          if (!user) {
            const newUserInfo = {
              firstName: profile._json.name,
              lastName: "",
              age: 18,
              email: profile._json.email,
              password: "",
            };
            const newUser = await Users.create(newUserInfo);
            return done(null, newUser);
          }
          done(null, user);
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  passport.use(
    "current",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "luis0303",
      },
      async (jwt_payload, done) => {
        try {
          done(null, jwt_payload);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await Users.findById(id);
    done(null, user);
  });
};
module.exports = initializePassport;

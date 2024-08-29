const app = require("./server");
const authRouter = require("./src/routers/auth.routers");
const profileRouter = require("./src/routers/profile.routers");

const passport = require("passport");
const configurePassport = require("./src/config/passport");
configurePassport(passport);

const authMiddleware = passport.authenticate("jwt", { session: false });

app.use("/auth", authRouter);

app.get(
  "/user",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/",
  }),
  (req, res) => {
    res.send(req.user);
  }
);

app.use(authMiddleware);
//protected routes
app.use("/profile", profileRouter);

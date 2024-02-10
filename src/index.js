const app = require("./server");
const authRouter = require("./routers/auth.routers");
const profileRouter = require("./routers/profile.routers");

const passport = require("passport");
const configurePassport = require("./config/passport");
configurePassport(passport);

const authMiddleware = passport.authenticate("jwt", { session: false });

app.use("/auth", authRouter);

app.use(authMiddleware);
//protected routes
app.use("/profile", profileRouter);

var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post")
const passport = require("passport");
const upload = require("./multer");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));

//Get index or "/" page;
router.get("/", function (req, res, next) {
  res.render("index", {nav:false});
});

//Get Register page;
router.get("/register", function (req, res, next) {
  res.render("register", {nav:false});
});

//profile page;
router.get("/profile", isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({username:req.session.passport.user});
  res.render("profile", {user, nav:true});
});
//add content page;
router.get("/add", isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({username:req.session.passport.user});
  res.render("add", {user, nav:true});
});




//fileupload router;
router.post("/fileupload", isLoggedIn,  upload.single("image"), async function (req, res, next) {
  const user = await userModel.findOne({username:req.session.passport.user});
  user.profileImage = req.file.filename;
  await user.save();
  res.redirect("/profile");
});

//post your pin images title and description router;
router.post("/createpost", isLoggedIn,  upload.single("postimage"), async function (req, res, next) {
  const user = await userModel.findOne({username:req.session.passport.user});
  const post =await postModel.create({
    image:req.file.filename,
    title:req.body.title,
    description:req.body.description,
    user:user._id,
  });

  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});

// Register Router page;
router.post("/register", function (req, res, next) {
  const user = new userModel({
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact,
  });

  userModel.register(user, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

//login router;
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
  }),
  function (req, res, next) {}
);

//logout router;
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//isLoggedIn.create a function;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;

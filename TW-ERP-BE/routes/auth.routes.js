const router = require("express").Router({ mergeParams: true });

const { signin, signup, logout, getUser } = require("../controllers/");
const { signinValidation, signupValidation } = require("../validation/");
const auth = require("../middlewares");

router.post("/signup", signupValidation, signup);
router.post("/signin", signinValidation, signin);
router.put("/logout", [auth.verifyToken], logout);
router.get("/getUser", [auth.verifyToken], getUser);

module.exports = router;

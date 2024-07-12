const router = require("express").Router()

const { signupController, signinController, updateUser, deleteUser }= require("./user.controller/user.controller")


router.post("/signup", signupController)
router.post("/signin", signinController)
router.put("/update/:id", updateUser)
router.delete("/delete/:id", deleteUser)


module.exports = router
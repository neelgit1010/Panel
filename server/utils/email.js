const {
  handleResetPassword,
  getResetPassword,
  setNewPassword,
} = require("../controllers/reset");

const router = require("express").Router();

router.post("/", handleResetPassword);
router.get("/:id/:token", getResetPassword);
router.post("/:id/:token", setNewPassword);

module.exports = router;

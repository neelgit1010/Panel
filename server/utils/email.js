const {
  handleResetPassword,
  getResetPassword,
} = require("../controllers/reset");

const router = require("express").Router();

router.post("/", handleResetPassword);
router.get("/:id/:token", getResetPassword);

module.exports = router;

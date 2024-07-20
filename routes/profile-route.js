const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminCtrl");
const {
  checkUserAuth,
} = require("../middleware/userAuthenticator");

router.get("/", checkUserAuth, admin.renderAdminPage);
router.post("/updateAdminInfo",admin.updateAdminInfo);
router.post("/updateAdminPassword",admin.updateAdminPassword);
module.exports = router;

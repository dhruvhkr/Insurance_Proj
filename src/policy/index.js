const {
  getPolicyAggregation,
  getPolicyById,
  updatePolicy,
} = require("./policy.controller");

const router = require("express").Router();

router.get("/", getPolicyAggregation);
router.get("/search", getPolicyById);
router.put("/update", updatePolicy);

module.exports = router;

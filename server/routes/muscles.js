const express = require("express");

const {
  getAllMuscleGroups,
  addNewMuscleGroup,
} = require("../controllers/muscles");

const router = express.Router();

router.get("/", getAllMuscleGroups);
router.post("/", addNewMuscleGroup);

module.exports = router;

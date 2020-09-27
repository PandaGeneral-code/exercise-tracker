const express = require("express");

const {
  addNewExercise,
  editExercise,
  getAllExercises,
} = require("../controllers/exercises");

const router = express.Router();

router.get("/", getAllExercises);
router.post("/", addNewExercise);
router.put("/:exerciseId", editExercise);

module.exports = router;

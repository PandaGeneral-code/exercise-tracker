const { pgClient } = require("../utils/db");

const addNewExercise = async (req, res, next) => {
  const {
    exerciseName,
    exerciseDescription,
    exerciseMuscleGroups,
    exerciseRating,
  } = req.body;
  try {
    const response = await pgClient.query(
      `INSERT INTO exercises (exercise_name, exercise_description, exercise_muscle_groups, exercise_rating)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [exerciseName, exerciseDescription, exerciseMuscleGroups, exerciseRating]
    );
    res.status(201).json({
      exercise: response.rows[0],
      message: `${exerciseName} added successfully`,
    });
  } catch (err) {
    next({
      ...err,
      message:
        err.message || `Could not add ${exerciseName}. Please try again later.`,
      status: err.status || 500,
    });
  }
};

const editExercise = async (req, res, next) => {
  console.log(req.body);
  const { exerciseId } = req.params;
  const {
    exerciseName,
    exerciseDescription,
    exerciseMuscleGroups,
    exerciseRating,
  } = req.body;
  try {
    const response = await pgClient.query(
      `UPDATE exercises
      SET exercise_name = $2, exercise_description = $3, exercise_muscle_groups = $4, exercise_rating = $5
      WHERE exercise_id = $1
      RETURNING *`,
      [exerciseId, "edited", "also edited", 3, [1, 4, 5]]
    );
    console.log(response.rows[0]);
    res.status(201).json({ exercise: response.rows[0] });
  } catch (err) {
    next({
      ...err,
      message:
        err.message || "Could not fetch the exercises. Please try again later",
      status: err.status || 500,
    });
  }
};

const getAllExercises = async (req, res, next) => {
  try {
    const response = await pgClient.query(
      `SELECT exercise_id, exercise_name, exercise_description, exercise_muscle_groups, exercise_rating
    FROM exercises`
    );
    res.status(200).json({ exercises: response.rows });
  } catch (err) {
    next({
      ...err,
      message:
        err.message || "Could not fetch the exercises. Please try again later",
      status: err.status || 500,
    });
  }
};

module.exports = { addNewExercise, getAllExercises, editExercise };

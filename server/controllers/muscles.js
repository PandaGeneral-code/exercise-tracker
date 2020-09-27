const { pgClient } = require("../utils/db");

const addNewMuscleGroup = async (req, res, next) => {
  const { muscleGroupName, muscleGroupAlias } = req.body;
  try {
    const response = await pgClient.query(
      `INSERT INTO muscle_groups (muscle_group_name, muscle_group_alias)
      VALUES ($1, $2)
      RETURNING *`,
      [muscleGroupName, muscleGroupAlias]
    );
    res.status(201).json({ newExercise: response.rows[0] });
  } catch (err) {
    next({
      ...err,
      message:
        err.message ||
        `Could not add ${muscleGroupName}. Please try again later.`,
      status: err.status || 500,
    });
  }
};

const getAllMuscleGroups = async (req, res, next) => {
  try {
    const response = await pgClient.query(`SELECT * FROM muscle_groups;`);
    res.status(200).json({ muscleGroups: response.rows });
  } catch (err) {
    next({
      ...err,
      message:
        err.message ||
        "Could not load the list of muscle groups. Please try again later.",
      status: err.status || 500,
    });
  }
};

module.exports = { addNewMuscleGroup, getAllMuscleGroups };

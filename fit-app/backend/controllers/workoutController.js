import Workout from "../models/workoutModel.js";
import mongoose from "mongoose";

const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({ createdAt: -1 });

        res.status(200).json(workouts)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    try {
        const workout = await Workout.create({ title, reps, load });
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid workout ID" });
    }
    try {
        const deletedWorkout = await Workout.findByIdAndDelete(id);
        if (deletedWorkout) {
            res.status(200).json({ message: "Workout deleted successfully", deletedWorkout })
        } else {
            res.status(404).json({ error: "Workout not found" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid workout ID" });
    }
    try {
        const updatedWorkout = await Workout.findOneAndUpdate(
            { _id: id },
            { ...req.body },
            { new: true });

        if (updatedWorkout) {
            res.status(200).json({ message: "Workout updated successfully", updatedWorkout })
        } else {
            res.status(404).json({ error: "Workout not found" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { createWorkout, getWorkouts, deleteWorkout, updateWorkout }
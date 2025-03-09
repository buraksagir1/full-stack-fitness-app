import express from 'express';
import { getWorkouts, createWorkout, deleteWorkout, updateWorkout } from '../controllers/workoutController.js';

const router = express.Router();

router.get('/', getWorkouts);

router.post('/', createWorkout);

router.delete('/:id', deleteWorkout);

router.put('/:id', updateWorkout);

export default router;
import { configureStore } from '@reduxjs/toolkit'
import workoutReducer from './slices/workoutSlice'

export const store = configureStore({
    reducer: {
        workouts: workoutReducer
    },
})
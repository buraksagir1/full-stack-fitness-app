import React, { useState } from 'react'
import { TextField, Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../slices/workoutSlice';

export default function WorkoutForm() {
    const [title, setTitle] = useState("");
    const [reps, setReps] = useState("")
    const [load, setLoad] = useState("")

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const workout = { title, reps, load };

        try {
            await dispatch(addWorkout(workout)).unwrap();
            setTitle("");
            setReps("");
            setLoad("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Box p={1} maxHeight={"250px"} mt={14} ml={10} display={"flex"} flexDirection={"column"} sx={{ width: "45%", backgroundColor: "white", boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', borderRadius: 1 }}>
            <form style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: "10px" }} onSubmit={handleSubmit}>
                <TextField value={title} onChange={(e) => setTitle(e.target.value)} label="Title" variant="outlined" />
                <TextField inputProps={{ min: 0 }} type='number' value={reps} onChange={(e) => setReps(e.target.value)} label="Reps" variant="outlined" />
                <TextField inputProps={{ min: 0 }} type='number' value={load} onChange={(e) => setLoad(e.target.value)} label="Load" variant="outlined" />
                <Button color='success' type="submit" variant="contained">ADD NEW WORKOUT</Button>
            </form>
        </Box>
    )
}

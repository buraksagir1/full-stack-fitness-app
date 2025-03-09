import React, { useEffect, useState } from 'react'
import { Box, Button, Modal, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkouts, deleteWorkout, updateWorkout } from '../slices/workoutSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function Navbar() {
    const dispatch = useDispatch();

    const workouts = useSelector((state) => state.workouts.workouts);
    const status = useSelector((state) => state.workouts.status);
    const error = useSelector((state) => state.workouts.error);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [currentWorkout, setCurrentWorkout] = useState({ _id: "", title: "", reps: "", load: "" });


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };


    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchWorkouts());
        }
    }, [dispatch, status]);

    if (status === "loading") return <p>Veriler yükleniyor...</p>;
    if (status === "failed") return <p>Hata: {error}</p>;

    const handleDelete = (id) => {
        dispatch(deleteWorkout(id));
    };

    const handleEditClick = (workout) => {
        setCurrentWorkout(workout); 
        handleOpen(); 
    };

    const handleChange = (e) => {
        setCurrentWorkout({ ...currentWorkout, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        const result = await dispatch(updateWorkout(currentWorkout));
        if (updateWorkout.fulfilled.match(result)) {
            handleClose();
        }
    };

    return (

        <Box gap={3} display={"flex"} flexDirection={"column"} mt={14} pl={2} sx={{ width: "60%" }}>
            {workouts.map((workout) => (
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"flex-start"} key={workout._id} p={4} sx={{ width: "100%", backgroundColor: "white", borderRadius: 1, boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }} >

                    <h2 style={{ color: "black", fontFamily: "arial" }}>{workout.title}</h2>
                    <p style={{ color: "black", fontFamily: "arial" }}>Rep: {workout.reps}</p>
                    <p style={{ color: "black", fontFamily: "arial" }}>Load : {workout.load} kg</p>

                    <Box display={"flex"} gap={2}>
                        <Button
                            onClick={() => handleDelete(workout._id)} // Silme fonksiyonu çağırılır
                            variant="contained"
                            color="error"
                        ><DeleteIcon /></Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEditClick(workout)}>
                            <EditIcon />
                        </Button>
                    </Box>

                </Box>
            ))}

            {/** Edit Modal starts */}
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box display={"flex"} flexDirection={"column"} gap={2} sx={style}>
                    <TextField name="title" label="Title" variant="outlined" value={currentWorkout.title} onChange={handleChange} />
                    <TextField inputProps={{ min: 0 }} name="reps" type='number' label="Reps" variant="outlined" value={currentWorkout.reps} onChange={handleChange} />
                    <TextField inputProps={{ min: 0 }} name="load" type='number' label="Load" variant="outlined" value={currentWorkout.load} onChange={handleChange} />
                    <Button color='success' variant="contained" onClick={() => { handleUpdate }


                    }>Update</Button>
                </Box>
            </Modal>
        </Box>
    )
    {/** Edit Modal ends */ }

}

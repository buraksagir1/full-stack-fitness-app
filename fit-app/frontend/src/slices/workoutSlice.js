import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// API'den workout verilerini çekme
export const fetchWorkouts = createAsyncThunk('workouts/fetchWorkouts', async () => {
    const response = await fetch("http://localhost:4000/api/workouts");
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu');
    }
    return data;
});

// API'ye yeni workout ekleme
export const addWorkout = createAsyncThunk('workouts/addWorkout', async (workout) => {
    const response = await fetch("http://localhost:4000/api/workouts", {
        method: "POST",
        body: JSON.stringify(workout),
        headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu');
    }
    return data; // Veriyi döndür
});

// API'dan workout silme:
export const deleteWorkout = createAsyncThunk('workouts/deleteWorkout', async (id) => {
    const response = await fetch(`http://localhost:4000/api/workouts/${id}`, {
        method: 'DELETE',
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu');
    }
    return id; // Silinen workout'un id'sini döndürüyoruz
});

// workout güncelleme
export const updateWorkout = createAsyncThunk('workouts/updateWorkout', async (workout) => {
    const response = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
        method: 'PUT',
        body: JSON.stringify(workout),
        headers: { 'Content-Type': 'application/json' }
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu');
    }
    return data; // Güncellenmiş workout'u döndür
});

const workoutsSlice = createSlice({
    name: 'workouts',
    initialState: {
        workouts: [],
        status: 'idle', // "idle" | "loading" | "succeeded" | "failed"
        error: null
    },
    reducers: {

    },
    extraReducers: (builder) => {
        // Get işlemi
        builder
            .addCase(fetchWorkouts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchWorkouts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.workouts = action.payload; // API'den gelen verileri workouts'a atıyoruz
            })
            .addCase(fetchWorkouts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });

        // Post işlemi
        builder
            .addCase(addWorkout.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addWorkout.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.workouts.push(action.payload); // Yeni workout'u ekliyoruz
            })
            .addCase(addWorkout.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
        // Delete işlemi
        builder
            .addCase(deleteWorkout.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteWorkout.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.workouts = state.workouts.filter(workout => workout._id !== action.payload); // Silinen workout'u listeden çıkarıyoruz
            })
            .addCase(deleteWorkout.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
        builder
            .addCase(updateWorkout.fulfilled, (state, action) => {
                const updatedWorkout = action.payload.updatedWorkout;
                state.workouts = state.workouts.map(workout =>
                    workout._id === updatedWorkout._id ? updatedWorkout : workout
                );
            });

    },
});


export default workoutsSlice.reducer;

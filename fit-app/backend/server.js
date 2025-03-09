import express from 'express';
import env from 'dotenv';
import workoutRoutes from './routes/workouts.js'
import mongoose from 'mongoose';
import cors from 'cors';

const PORT = process.env.PORT || 4000;

env.config();

const app = express();

app.use(express.json());


app.use(cors());


app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use('/api/workouts', workoutRoutes);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(PORT, () => {
            console.log('server is running at port ' + PORT);
            console.log("connected to db");
        });
    } catch (error) {
        console.log("error in connecting to" + error)
    }

}

connectDB();




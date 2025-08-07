import { app } from "./App.js";
import connectDB from "./config/db.js";
import dotenv from 'dotenv'
import path, { dirname } from 'path'
dotenv.config({
    path: '../.env'
});

connectDB()
.then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
})

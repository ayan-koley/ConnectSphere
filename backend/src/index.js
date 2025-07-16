import { app } from "./App";
import connectDB from "./config/db.js";


connectDB()
.then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
})
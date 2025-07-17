import { app } from "./App.js";
import connectDB from "./config/db.js";
import dotenv from 'dotenv'
import ngrok from '@ngrok/ngrok'
dotenv.config()


connectDB()
.then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    // Get your endpoint online
    ngrok.connect({ addr: 5000, authtoken: process.env.NGROK_AUTHTOKEN })
        .then(listener => console.log(`Ingress established at: ${listener.url()}`))
        .catch((err) => console.log("ERROR on ngrok connection ", err));
    
})
.catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
})

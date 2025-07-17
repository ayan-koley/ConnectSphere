import express from "express";
import { clerkMiddleware } from '@clerk/express'
const app = express();

app.use(express.json());
app.use(clerkMiddleware({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
}));


import authRouter from './routes/user.routes.js';
app.use("/api/webhook", authRouter);

export {
    app
}
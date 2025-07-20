import express from "express";
import { clerkMiddleware } from "@clerk/express";
const app = express();

app.use(express.json());
app.use(
  clerkMiddleware({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

import authRouter from "./routes/user/auth.routes.js";
import userProfileRouter from "./routes/user/userProfile.routes.js";
import userSettingRouter from "./routes/user/user/userSetting.routes.js";
import followRelationshipRouter from "./routes/user/followRelationhip.routes.js";
import postRouter from './routes/post/post.routes.js';
import likeRouter from './routes/post/like.routes.js';
import postFavoriteRouter from './routes/post/favorite.routes.js';  
import postViewRouter from './routes/post/postView.routes.js';
import commentRouter from './routes/post/comment.routes.js';


app.use("/api/v1/webhook", authRouter);
app.use("/api/v1/user/profile", userProfileRouter);
app.use("/api/v1/user/setting", userSettingRouter);
app.use("/api/v1/relation", followRelationshipRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/post/favorite", postFavoriteRouter);
app.use("/api/v1/post/view", postViewRouter);
app.use("/api/v1/post/comment", commentRouter);

export { app };

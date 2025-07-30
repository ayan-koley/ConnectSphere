import express from "express";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(
  clerkMiddleware({
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);
app.use(express.urlencoded({ extended: true }));
// app.use()

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

import authRouter from "./routes/user/auth.routes.js";
import userProfileRouter from "./routes/user/userProfile.routes.js";
import userSettingRouter from "./routes/user/userSetting.routes.js";
import followRelationshipRouter from "./routes/user/followRelationhip.routes.js";
import postRouter from "./routes/post/post.routes.js";
import likeRouter from "./routes/post/like.routes.js";
import postFavoriteRouter from "./routes/post/favorite.routes.js";
import postViewRouter from "./routes/post/postView.routes.js";
import commentRouter from "./routes/post/comment.routes.js";
import searchRouter from "./routes/search/search.routes.js";
import feddRouter from "./routes/feed/feed.routes.js";
import healthCheckRouter from "./routes/healthcheck.routes.js";
import dashboardRouter from "./routes/dashboard/dashboard.routes.js";

app.use("/api/v1/webhook", authRouter);
app.use("/api/v1/user/profile", userProfileRouter);
app.use("/api/v1/user/setting", userSettingRouter);
app.use("/api/v1/relation", followRelationshipRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/like", likeRouter);
app.use("/api/v1/favorite/post", postFavoriteRouter);
app.use("/api/v1/view/post", postViewRouter);
app.use("/api/v1/comment/post", commentRouter);
app.use("/api/v1/search", searchRouter), 
app.use("/api/v1/feed", feddRouter);
app.use("/api/v1/health", healthCheckRouter);
app.use("/api/v1/dashboard", dashboardRouter);

export { app };

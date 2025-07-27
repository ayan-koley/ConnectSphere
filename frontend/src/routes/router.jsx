import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Layout from "../components/AuthLayout/Layout.jsx";
import HomePage from "../Pages/HomePage.jsx";
import FavoritesPage from "../Pages/FavoritesPage.jsx";
import ProfilePage from "../Pages/ProfilePage.jsx";
import PostViewPage from "../Pages/PostViewPage.jsx";
import SignUpPage from "../Pages/SignUpPage.jsx";
import SignInPage from "../Pages/SignInPage.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (<Layout isAuthenticateRequired="false"><App /></Layout>),
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/favorites",
                element: <FavoritesPage />
            },
            {
                path: "/profile",
                element: <ProfilePage />,
            },
            {
                path: "/post/:id",
                element: <PostViewPage />
            }
        ]
    },
    {
        path: "/sign-up",
        element: <SignUpPage />
    },
    {
        path: "/sign-in",
        element: <SignInPage />
    }
])

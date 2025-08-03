import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Layout from "../components/AuthLayout/Layout.jsx";
import HomePage from "../Pages/HomePage.jsx";
import FavoritesPage from "../Pages/FavoritesPage.jsx";
import ProfilePage from "../Pages/ProfilePage.jsx";
import PostViewPage from "../Pages/PostViewPage.jsx";
import SignUpPage from "../Pages/SignUpPage.jsx";
import SignInPage from "../Pages/SignInPage.jsx";
import SearchItemsPage from "../Pages/SearchItemsPage.jsx";
import UserProfilePage from "../Pages/UserProfilePage.jsx";
import Profile from "../components/ProfileSection/Profile.jsx";
import ProfileDetails from "../components/ProfileSection/ProfileDetails.jsx";
import ProfileTabs from "../components/ProfileSection/ProfileTabs.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App should contain <Outlet />
    children: [
      {
        path: "/",
        element: (
          <Layout isAuthenticateRequired={false}>
            <HomePage />
          </Layout>
        ),
      },
      {
        path: "favorites",
        element: (
          <Layout isAuthenticateRequired={true}>
            <FavoritesPage />
          </Layout>
        ),
      },
      {
        path: "profile/:userId",
        element: (
         <Layout isAuthenticateRequired={true}>
            <ProfilePage />
          </Layout>
        ),
      },
      {
        path: "post/:postId",
        element: (
          <Layout isAuthenticateRequired={false}>
            <PostViewPage />
          </Layout>
        ),
      },
      {
        path: "search",
        element: (
          <Layout isAuthenticateRequired={false}>
            <SearchItemsPage />
          </Layout>
        ),
      },
      {
        path: "view",
        element: (
          <Layout isAuthenticateRequired={false}>
            <UserProfilePage />
          </Layout>
        ),
      },
      {
        path: "sign-up",
        element: (
          <Layout isAuthenticateRequired={false}>
            <SignUpPage />
          </Layout>
        ),
      },
      {
        path: "sign-in",
        element: (
          <Layout isAuthenticateRequired={false}>
            <SignInPage />
          </Layout>
        ),
      },
    ],
  },
  
]);

import { createBrowserRouter, Outlet } from "react-router-dom";
import AuthProvider from "../contexts/AuthProvider";

import Home from "../pages/Home";
import Login from "../pages/Login";
import ErrorPage from "../pages/Error";
import NoteList from "../components/NoteList";
import ProtectedRoute from "./ProtectedRoute";
import Note from "../components/Note";
import loaderData from "../utils/loader";
const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default createBrowserRouter([
  {
    errorElement: <ErrorPage />,
    element: <AuthLayout />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: "/",
            loader: () => loaderData.homeLoader(),
            children: [
              {
                element: <NoteList />,
                path: "folders/:folderId",
                loader: ({ params }) => loaderData.noteListLoader({ params }),
                children: [{ element: <Note />, path: "note/:noteId" }],
              },
            ],
          },
        ],
      },
    ],
  },
]);

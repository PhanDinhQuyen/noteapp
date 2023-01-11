import { createBrowserRouter, Outlet } from "react-router-dom";
import AuthProvider from "../context/AuthProvider";

import Home from "../page/Home";
import Login from "../page/Login";
import ErrorPage from "../Page/Error";
import NoteList from "../Components/NoteList";
import ProtectedRoute from "./ProtectedRoute";
import Note from "../Components/Note";
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

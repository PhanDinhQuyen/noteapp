import { Typography, Button } from "@mui/material";
import axios from "axios";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Navigate } from "react-router-dom";
import requestLogin from "./request";
export default function LoginPage() {
  const auth = getAuth();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const { user } = await signInWithPopup(auth, provider);
    console.log(user);
    const { displayName, uid, accessToken } = user;
    const data = await requestLogin(displayName, uid, accessToken);
    console.log("register", { data });
  };

  if (localStorage.getItem("accessToken")) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <Typography variant='h5' sx={{ marginBottom: "10px" }}>
        Welcome to Note App
      </Typography>
      <Button variant='outlined' onClick={handleLoginWithGoogle}>
        Login with Google
      </Button>
    </>
  );
}

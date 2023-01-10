import { Typography, Button } from "@mui/material";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const auth = getAuth();
  const state = useContext(AuthContext);
  const [user] = state.user;
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.uid) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const handleLoginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(["result"], result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Typography variant='h5' color='initial'>
        WellCome to Note App
      </Typography>
      <Button
        onClick={handleLoginWithGoogle}
        color='primary'
        sx={{ marginTop: "1rem" }}
        variant='outlined'
      >
        Login With Google
      </Button>
    </>
  );
}

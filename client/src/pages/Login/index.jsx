import { Navigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

import * as httpRequest from "../../utils/httpRequest";

export default function LoginPage() {
  const auth = getAuth();

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const { user } = await signInWithPopup(auth, provider);
    const { displayName, uid, accessToken } = user;
    const data = await httpRequest.post(
      {
        query: `mutation Mutation($uid: String!, $name: String!) {
          addAuthor(uid: $uid, name: $name) {
            name
            uid
          }
        }`,
        variables: {
          name: displayName,
          uid: uid,
        },
      },
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
    console.log(data);
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

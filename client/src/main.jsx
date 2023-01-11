import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Container } from "@mui/system";

import GlobalStyle from "./Components/GlobalStyle";
import router from "./Router";
import "./firebase";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle>
      <Container maxWidth='lg' sx={{ textAlign: "center", mt: "5rem" }}>
        <RouterProvider router={router} />
      </Container>
    </GlobalStyle>
  </React.StrictMode>
);

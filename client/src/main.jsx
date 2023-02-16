import ReactDOM from "react-dom/client";
import { Container } from "@mui/system";
import { RouterProvider } from "react-router-dom";

import "./firebase";
import router from "./routers";
import GlobalStyle from "./components/GlobalStyle";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <GlobalStyle>
    <Container maxWidth='lg' sx={{ textAlign: "center", mt: "5rem" }}>
      <RouterProvider router={router} />
    </Container>
  </GlobalStyle>
  // </React.StrictMode>
);

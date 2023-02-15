import { getAuth } from "firebase-admin/auth";

export const jwtAuth = async (req, res, next) => {
  // console.log({ authorization: req.headers.authorization });
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const accessToken = authorizationHeader.split(" ")[1];
    // console.log(accessToken);
    getAuth()
      .verifyIdToken(accessToken)
      .then((decodedToken) => {
        // console.log(decodedToken.uid);
        res.locals.uid = decodedToken.uid;
        next();
      })
      .catch((err) => {
        return res.status(403).json({ message: "Forbidden", error: err });
      });
  } else {
    // next();
    return res.status(401).json({ message: "Unauthorized" });
  }
};

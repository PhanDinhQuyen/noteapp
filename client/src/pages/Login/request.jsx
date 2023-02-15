import * as httpRequest from "../../utils/httpRequest";

import { mutations } from "../../utils/mutation";
export default async function requestLogin(displayName, uid, accessToken) {
  const query = mutations.loginMutation;
  const res = await httpRequest.post(
    "graphql",
    {
      query,
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
  console.log(res);
}

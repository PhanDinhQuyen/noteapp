import * as httpRequest from "../../utils/httpRequest";
import { mutations } from "../../utils/mutation";
export default async function requestAddNewFolder(name) {
  const res = await httpRequest.post(`graphql`, {
    query: mutations.addNewFolderMutation,
    variables: {
      name: name,
    },
  });
  console.log(res);
}

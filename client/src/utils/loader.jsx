import * as httpRequest from "./httpRequest";
import { queries } from "./query";

const loaderData = {
  noteListLoader: async ({ params: { folderId } }) => {
    const query = queries.noteListLoaderQuery;

    const data = await httpRequest.post("graphql", {
      query,
      variables: {
        folderId,
      },
    });
    return data;
  },
  homeLoader: async () => {
    const query = queries.homeLoaderQuery;

    const data = await httpRequest.post("graphql", { query });
    return data;
  },
};
export default loaderData;

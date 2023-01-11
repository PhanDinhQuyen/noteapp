import * as httpRequest from "./httpRequest";

const loaderData = {
  noteListLoader: async ({ params: { folderId } }) => {
    const query = `query Folder($folderId: String) {
                   folder(folderId: $folderId) {
                    id
                    name
                    createdAt
                    notes {
                      content
                      id
                      }
                    }
                  }`;

    const data = await httpRequest.post("graphql", {
      query,
      variables: {
        folderId,
      },
    });
    return data;
  },
  homeLoader: async () => {
    const query = `query Folders {
                   folders {
                      createdAt
                      id
                      name
                      }
                   }`;

    const data = await httpRequest.post("graphql", { query });
    return data;
  },
};
export default loaderData;

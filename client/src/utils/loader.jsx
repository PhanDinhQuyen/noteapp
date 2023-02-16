import * as httpRequest from "./httpRequest";

const queries = {
  noteListLoaderQuery: `query Folder($folderId: String) {
    folder(folderId: $folderId) {
      id
      name
      createdAt
      notes {
        content
        id
      }
    }
  }`,
  homeLoaderQuery: `query Folders {
    folders {
      createdAt
      id
      name
      }
  }`,
};

const loaderData = {
  noteListLoader: async ({ params: { folderId } }) => {
    const query = queries.noteListLoaderQuery;

    const data = await httpRequest.post({
      query,
      variables: {
        folderId,
      },
    });
    return data;
  },
  homeLoader: async () => {
    const query = queries.homeLoaderQuery;

    const data = await httpRequest.post({ query });
    return data;
  },
};
export default loaderData;

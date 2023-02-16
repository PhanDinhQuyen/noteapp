import * as httpRequest from "./httpRequest";

const mutations = {
  addNewFolder: `mutation Mutation($name: String!) {
    addFolder(name: $name) {
      name
      author {
        name
      }
    }
  }`,
  removeFolder: `mutation Mutation($removeFolderId: String!) {
    removeFolder(id: $removeFolderId) {
      name
    }
  }`,
};

export async function addNewFolder(name) {
  const data = await httpRequest.post({
    query: mutations.addNewFolder,
    variables: {
      name: name,
    },
  });
  return data;
}

export async function removeFolder(id) {
  const data = await httpRequest.post({
    query: mutations.removeFolder,
    variables: {
      removeFolderId: id,
    },
  });
  return data;
}

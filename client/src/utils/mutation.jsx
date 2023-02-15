export const mutations = {
  addNewFolderMutation: `mutation Mutation($name: String!) {
    addFolder(name: $name) {
      name
      author {
        name
      }
    }
  }`,
  loginMutation: `mutation Mutation($uid: String!, $name: String!) {
    addAuthor(uid: $uid, name: $name) {
      name
      uid
    }
  }`,
};

export const queries = {
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

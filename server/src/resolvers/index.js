import { Authors, Folders, Notes } from "../models/index.js";

const resolvers = {
  Query: {
    folders: async (parent, args, context) => {
      const folders = await Folders.find({
        authorId: context.uid,
      }).sort({
        updatedAt: "desc",
      });
      return folders;
    },
    folder: async (_, args) => {
      const folderId = args.folderId;
      console.log(args);
      const folder = await Folders.findById(folderId);
      return folder;
    },
  },

  Folder: {
    author: async (parent) => {
      const authorId = parent.authorId;
      const author = await Authors.findOne({
        uid: authorId,
      });
      return author;
    },
    notes: async (parent, args) => {
      const notes = await Notes.find({ folderId: parent.id });
      return notes;
    },
  },

  Mutation: {
    addFolder: async (parent, args, context) => {
      if (!context?.uid) return;
      const newFolder = new Folders({ ...args, authorId: context.uid });
      await newFolder.save();
      return newFolder;
    },
    removeFolder: async (parent, args) => {
      const folderRemove = await Folders.findByIdAndRemove(args.id);
      return folderRemove;
    },
    addNote: async (parent, args) => {
      const newNote = new Notes({ ...args });
      await newNote.save();
      return newNote;
    },
    addAuthor: async (_, args) => {
      const { uid, name } = args;
      const author = await Authors.findOne({
        uid: uid,
      });
      if (!author) {
        const newAuthor = new Authors({
          uid,
          name,
        });
        await newAuthor.save();
        return newAuthor;
      }
      return author;
    },
  },
};

export default resolvers;

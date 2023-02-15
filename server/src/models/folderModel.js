import mongoose from "mongoose";

const folderShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    authorId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Folders = mongoose.model("Folders", folderShema);
export default Folders;

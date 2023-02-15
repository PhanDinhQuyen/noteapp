import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      default: "",
    },
    folderId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
// export default mongoose.model("Notes", noteSchema);
const Notes = mongoose.model("Notes", noteSchema);
export default Notes;

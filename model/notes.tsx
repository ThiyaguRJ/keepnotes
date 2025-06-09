import mongoose, { Schema } from "mongoose";

const NotesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Notes =
  mongoose.models.Notes || mongoose.model("Notes", NotesSchema);

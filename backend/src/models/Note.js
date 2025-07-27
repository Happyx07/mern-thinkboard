import mongoose from "mongoose";

// Create a schema for the Note model
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Note model using the schema
const Note = mongoose.model("Note", noteSchema);
// Export the Note model
export default Note;
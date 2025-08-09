import Note from "../models/note.js";

export async function getAllNotes (req, res) {
  try {
    // Simulate fetching notes from a database
    const notes = await Note.find().sort({ createdAt: -1 }); // gives the latest notes first
    res.status(200).json(notes);

  } catch (error) {
    console.error("Error in getAllNotes controller:", error);
    res.status(500).json({ message: "Error fetching notes" });
  }
}

export async function getNoteById (req, res) {
  try {
    const noteId = req.params.id;
    const noteDoc = await Note.findById(noteId);
    if (!noteDoc) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(noteDoc);
  } catch (error) {
    console.error("Error in getNoteById controller:", error);
    res.status(500).json({ message: "Error fetching note" });
    
  }
}

export async function createNote (req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({
      title,
      content,
    });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully!" });
  } catch (error) {
    console.error("Error in createNote controller:", error);
    res.status(500).json({ message: "Error in creating note" });
  }
}

export async function updateNote (req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note updated successfully!" });
  } catch (error) {
    console.error("Error in updateNote controller:", error);
    res.status(500).json({ message: "Error in updating note" });
  }
}

export async function deleteNote (req, res) {
  try {
    const noteId = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteNote controller:", error);
    res.status(500).json({ message: "Error in deleting note" });
  }
}

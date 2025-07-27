import express from 'express';
import { createNote, deleteNote, getAllNotes, updateNote,getNoteById } from '../controllers/notesController.js';

const router = express.Router();

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);


export default router;
// This code defines the routes for the notes API. It imports the necessary modules and functions, creates an Express router, and sets up the routes for getting all notes, creating a note, updating a note, and deleting a note. Finally, it exports the router for use in other parts of the application.
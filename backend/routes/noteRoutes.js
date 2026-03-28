const express = require('express')
const router = express.Router()
const Note = require('../models/Note')

router.post('/', async (req,res) => {
    try{
        const {title, content} = req.body

        if(!title || !content){
            return res.status(400).json({message: "Title and content are required"})
        }

        const newNote = new Note({title, content})
        const savedNote = await newNote.save()

        const io = req.app.get("socketio")
        io.emit('note created', savedNote)
        res.status(201).json(savedNote)
    }catch (error){
        res.status(500).json({message: "server error", error: error.message})
    }
})

router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.search;
    let query = {};

    
    if (searchQuery) {
      query = {
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } }, 
          { content: { $regex: searchQuery, $options: 'i' } }
        ]
      };
    }
    
    const notes = await Note.find(query).sort({ createdAt: -1 }); // Fetch notes and sort by newest first
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const noteId = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    
    const io = req.app.get('socketio');
    io.emit('note_deleted', noteId); // Tell all clients to remove this specific ID

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router
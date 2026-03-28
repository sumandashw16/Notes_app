const express = require('express')
const router = express.Router()
const Note = require('../models/Note')

router.post('/', async (req,res) => {
  try{
    console.log("1. Backend received the request!");
    console.log("Data received:", req.body);
    const {title, content} = req.body

    if(!title || !content){
        return res.status(400).json({message: "Title and content are required"})
    }

    const newNote = new Note({title, content})
    console.log("2. Attempting to save to MongoDB...");
    const savedNote = await newNote.save()
    console.log("3. Saved successfully!");

    const io = req.app.get("socketio")
    io.emit('note_created', savedNote)
    res.status(201).json(savedNote)
  }catch (error){
      res.status(500).json({message: "server error", error: error.message})
  }
})

router.get('/', async (req, res) => {
  try {
    // 1. Pulling 'search' from the URL (req.query.search)
    const term = req.query.search; 

    let query = {};

    // 2. Use 'term' (or whatever you named it above) in the regex
    if (term) {
      query = {
        $or: [
          { title: { $regex: term, $options: 'i' } }, 
          { content: { $regex: term, $options: 'i' } }
        ]
      };
    }

    const notes = await Note.find(query).sort({ createdAt: -1 });
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
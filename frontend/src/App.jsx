import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import NoteForm from './components/NoteForm';
import SearchBar from './components/SearchBar'; // 1. Import Search
import './index.css';

const socket = io('http://localhost:5000');

function App() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async (searchTerm = '') => {
    try {
      const response = await fetch(`http://localhost:5000/notes?search=${searchTerm}`);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();

    socket.on('note_created', (newNote) => {
      setNotes((prev) => [newNote, ...prev]);
    });

    socket.on('note_deleted', (deletedId) => {
      setNotes((prev) => prev.filter(note => note._id !== deletedId));
    });

    return () => {
      socket.off('note_created');
      socket.off('note_deleted');
    };
  }, []);

  const deleteNote = async (id) => {
    try {
      await fetch(`http://localhost:5000/notes/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

    return (
    <div className="app-container">
        <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a' }}>NOTE APP</h1>
        <p style={{ color: '#64748b' }}>A Real-Time Notes Application</p>
        </header>

        <SearchBar onSearch={fetchNotes} />
        <NoteForm />

        <div className="notes-grid">
        {notes.map(note => (
            <div key={note._id} className="note-card">
            <h3 style={{ margin: '0 0 10px 0' }}>{note.title}</h3>
            <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '20px' }}>{note.content}</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => deleteNote(note._id)} className="delete-btn">Delete</button>
            </div>
            </div>
        ))}
        </div>
    </div>
    );
}

export default App;
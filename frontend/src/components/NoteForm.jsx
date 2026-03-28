import { useState } from 'react';
import axios from 'axios';

const NoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    if (!title.trim() || !content.trim()) {
      setError('Both title and content are required!');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Send the REST request using native fetch
      const response = await fetch('http://localhost:5000/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Tell the server we are sending JSON
        },
        body: JSON.stringify({ title, content }), // Convert our React state to a JSON string
      });

      if (!response.ok) {
        throw new Error(`Failed to save note. Status: ${response.status}`);
      }
      
      // Clear the form on success
      setTitle('');
      setContent('');
    } catch (err) {
      setError('Failed to save the note. Please try again.');
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
    <h3 style={{ margin: '0 0 16px 0', fontSize: '1.1rem' }}>New Note</h3>
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input 
        className="custom-input"
        type="text" 
        placeholder="Title" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' }}
      />
      <textarea 
        placeholder="Take a note..." 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', minHeight: '100px', outline: 'none' }}
      />
      <button 
        type="submit"
        style={{ background: '#2563eb', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}
      >
        {loading ? 'Saving...' : 'Add Note'}
      </button>
    </form>
  </div>
);
};

export default NoteForm;
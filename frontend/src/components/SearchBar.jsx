import { useState, useEffect } from 'react';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  useEffect(() => {
    // Start a 500ms timer
    const delayDebounceFn = setTimeout(() => {
      onSearch(term);
    }, 500);

    // CLEANUP: If the user types again, this cancels the previous timer
    return () => clearTimeout(delayDebounceFn);
  }, [term]);

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search notes by title or content..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          boxSizing: 'border-box'
        }}
      />
    </div>
  );
};

export default SearchBar;
import React, { useState, useEffect } from 'react';
import './Notepad.css';
import backgroundImage from '../assets/5.jpg'; // Import the image

const Notepad = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [editingNoteId, setEditingNoteId] = useState(null);

    const colors = ['#FFDDC1', '#FFABAB', '#FFC3A0', '#FF677D', '#D9BF77', '#A8D8EA', '#A3DFF7', '#FFE156'];

    // Load notes from localStorage when component mounts
    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotes(savedNotes);
    }, []);

    // Save notes to localStorage whenever the notes array changes
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    const handleAddNote = (e) => {
        e.preventDefault();
        if (newNote.trim()) {
            const noteToAdd = {
                id: Date.now(),
                text: newNote,
                color: colors[notes.length % colors.length] // Assign color based on note count
            };
            setNotes([...notes, noteToAdd]);
            setNewNote('');
        }
    };

    useEffect(() => {
        // Clear localStorage (or sessionStorage) on component mount
        localStorage.clear();
        // If you're using sessionStorage, you can clear it like this:
        // sessionStorage.clear();
    }, []);

    const handleEditNote = (id) => {
        const noteToEdit = notes.find(note => note.id === id);
        setNewNote(noteToEdit.text);
        setEditingNoteId(id);
    };

    const handleSaveNote = () => {
        if (editingNoteId) {
            setNotes(notes.map(note => 
                note.id === editingNoteId ? { ...note, text: newNote } : note
            ));
            setEditingNoteId(null);
        }
        setNewNote('');
    };

    const handleDeleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    return (
        <div className="notepad" style={{
            backgroundImage: `url(${backgroundImage})`, // Use the imported image
            backgroundSize: 'cover', // Ensure the image covers the entire area
            backgroundPosition: 'center', // Center the background image
            minHeight: '100vh', // Set minimum height
            display: 'flex', // Flexbox for centering
            flexDirection: 'column', // Stack elements vertically
            alignItems: 'center', // Center align content
            padding: '20px', // Add some padding
            color: '#333' // Text color
        }}>
            <div className="header">
                <h1>Notepad</h1>
            </div>

            <div className="input-card">
                <form onSubmit={editingNoteId ? handleSaveNote : handleAddNote}>
                    <textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Write your note here..."
                        required
                    />
                    <button type="submit">{editingNoteId ? 'Update Note' : 'Add Note'}</button>
                </form>
            </div>

            <div className="note-gallery">
                {notes.map((note) => (
                    <div key={note.id} className="note-card" style={{ backgroundColor: note.color }}>
                        <h3>Note</h3>
                        <p>{note.text}</p>
                        <button onClick={() => handleEditNote(note.id)}>Edit</button>
                        <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notepad;

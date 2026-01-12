import React, { useState, useEffect, useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import "./Notes.css";

function Notes() {
  const { notes, setNotes } = useContext(NotesContext);
  const [newNote, setNewNote] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) fetchNotes();
    // eslint-disable-next-line
  }, [token]);

  // 🔹 Fetch notes
  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:5000/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setNotes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setNotes([]);
    }
  };

  // 🔹 Add note
  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    try {
      const res = await fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newNote }),
      });

      const data = await res.json();
      setNotes([data, ...notes]); // updates sidebar count
      setNewNote("");
    } catch {}
  };

  // 🔹 Delete note
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/notes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotes(notes.filter((note) => note._id !== id));
    } catch {}
  };

  // 🔹 Save edit
  const handleSaveEdit = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editContent }),
      });

      const updated = await res.json();
      setNotes(notes.map((n) => (n._id === id ? updated : n)));
      setEditNoteId(null);
      setEditContent("");
    } catch {}
  };

  return (
    <div className="notes-wrapper">
      {/* Add Note */}
      <div className="add-note-card">
        <input
          type="text"
          placeholder="Write a new note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button onClick={handleAddNote}>Add</button>
      </div>

      {/* Notes Grid */}
      <div className="notes-grid">
        {notes.length === 0 && (
          <p className="empty-text">No notes yet. Start writing ✍️</p>
        )}

        {notes.map((note) => (
          <div key={note._id} className="note-card">
            {editNoteId === note._id ? (
              <>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="note-actions">
                  <button className="save" onClick={() => handleSaveEdit(note._id)}>
                    Save
                  </button>
                  <button className="cancel" onClick={() => setEditNoteId(null)}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="note-text">{note.content}</p>
                <div className="note-actions">
                  <button
                    onClick={() => {
                      setEditNoteId(note._id);
                      setEditContent(note.content);
                    }}
                  >
                    Edit
                  </button>
                  <button className="delete" onClick={() => handleDelete(note._id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;

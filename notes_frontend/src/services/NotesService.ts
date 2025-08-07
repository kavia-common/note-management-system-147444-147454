"use client";

/**
 * NotesService - handles requests to the notes_database backend.
 * Note: Update the API_BASE_URL to match the backend deployment config.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_NOTES_API_URL || "http://localhost:8000"; // Update if needed

export type Note = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type NoteInput = {
  title: string;
  content: string;
};

// PUBLIC_INTERFACE
export async function fetchNotes(search?: string): Promise<Note[]> {
  /**
   * Fetch all notes, optionally filtered by search query.
   */
  const url = new URL(`${API_BASE_URL}/notes`);
  if (search) url.searchParams.append("search", search);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

// PUBLIC_INTERFACE
export async function fetchNote(id: string): Promise<Note> {
  /**
   * Fetch a single note by id.
   */
  const res = await fetch(`${API_BASE_URL}/notes/${id}`);
  if (!res.ok) throw new Error("Failed to fetch note");
  return res.json();
}

// PUBLIC_INTERFACE
export async function createNote(payload: NoteInput): Promise<Note> {
  /**
   * Create a new note.
   */
  const res = await fetch(`${API_BASE_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

// PUBLIC_INTERFACE
export async function updateNote(id: string, payload: NoteInput): Promise<Note> {
  /**
   * Update an existing note.
   */
  const res = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
}

// PUBLIC_INTERFACE
export async function deleteNote(id: string): Promise<void> {
  /**
   * Delete a note by id.
   */
  const res = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete note");
}

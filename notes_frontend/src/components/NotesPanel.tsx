"use client";

import React, { useState, useMemo } from "react";
import { Note, NoteInput } from "../services/NotesService";
import { NoteEditor } from "./NoteEditor";

type NotesPanelProps = {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  create: (input: NoteInput) => Promise<void>;
  update: (id: string, input: NoteInput) => Promise<void>;
  remove: (id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

export function NotesPanel({
  notes,
  selectedId,
  onSelect,
  create,
  update,
  remove,
  isLoading,
  error,
}: NotesPanelProps) {
  const [editing, setEditing] = useState(false);
  const [creating, setCreating] = useState(false);

  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  // If they just created, auto-enter edit mode
  React.useEffect(() => {
    if (selectedId && !selectedNote) {
      setEditing(false);
      setCreating(false);
    }
  }, [selectedId, selectedNote]);

  // triggers "new note" UI
  const startCreate = () => {
    setCreating(true);
    setEditing(false);
    onSelect("");
  };

  // triggers "edit" UI for selected
  const startEdit = () => setEditing(true);

  // save handlers:
  const handleCreate = async (input: NoteInput) => {
    await create(input);
    setCreating(false);
  };

  const handleSave = async (input: NoteInput) => {
    if (!selectedNote) return;
    await update(selectedNote.id, input);
    setEditing(false);
  };

  const handleDelete = async () => {
    if (!selectedNote) return;
    await remove(selectedNote.id);
    setEditing(false);
  };

  if (isLoading) {
    return (
      <main className="flex-1 flex items-center justify-center text-primary">
        Loading notes...
      </main>
    );
  }
  if (error) {
    return (
      <main className="flex-1 flex items-center justify-center text-red-600">
        {error}
      </main>
    );
  }

  if (creating) {
    return (
      <main className="flex-1 bg-surface h-full">
        <NoteEditor
          note={null}
          onSave={handleCreate}
          onDelete={null}
          isSaving={isLoading}
          isNew={true}
          onCancel={() => setCreating(false)}
        />
      </main>
    );
  }

  if (editing && selectedNote) {
    return (
      <main className="flex-1 bg-surface h-full">
        <NoteEditor
          note={selectedNote}
          onSave={handleSave}
          onDelete={handleDelete}
          isSaving={isLoading}
          isNew={false}
          onCancel={() => setEditing(false)}
        />
      </main>
    );
  }

  if (!selectedNote) {
    return (
      <main className="flex-1 flex flex-col items-center justify-center bg-surface h-full">
        <button
          className="bg-accent hover:bg-primary text-white px-6 py-3 rounded-lg shadow transition text-base font-medium"
          onClick={startCreate}
        >
          + Create your first note
        </button>
        <p className="text-secondary/70 mt-6">Select a note to view or edit it.</p>
      </main>
    );
  }

  // Default: show note preview, with Edit button
  return (
    <main className="flex-1 h-full flex flex-col justify-center bg-surface p-10">
      <div className="max-w-2xl mx-auto">
        <div className="mb-2 flex items-center gap-3">
          <h1 className="text-2xl text-primary font-bold flex-1 break-all">
            {selectedNote.title || <em>(Untitled)</em>}
          </h1>
          <button
            className="ml-4 px-3 py-1 bg-accent text-white text-sm rounded hover:bg-primary transition"
            onClick={startEdit}
          >
            Edit
          </button>
        </div>
        <article className="text-lg text-secondary whitespace-pre-line min-h-[14rem] border border-muted bg-background rounded-lg p-4">
          {selectedNote.content || <span className="text-secondary/50 italic">(No content)</span>}
        </article>
        <div className="mt-6 text-xs text-muted">
          Created: {new Date(selectedNote.created_at).toLocaleString()}
          <span className="mx-2">|</span>
          Updated: {new Date(selectedNote.updated_at).toLocaleString()}
        </div>
      </div>
    </main>
  );
}

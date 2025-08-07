"use client";

import React, { useState, useEffect } from "react";
import type { Note, NoteInput } from "../services/NotesService";

type NoteEditorProps = {
  note?: Note | null;
  onSave: (input: NoteInput) => Promise<void>;
  onDelete: (() => Promise<void>) | null;
  isSaving: boolean;
  isNew: boolean;
  onCancel: () => void;
};

export function NoteEditor({
  note,
  onSave,
  onDelete,
  isSaving,
  isNew,
  onCancel,
}: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
  }, [note]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title && !content) {
      setError("Cannot save an empty note.");
      return;
    }
    setError(null);
    try {
      await onSave({ title, content });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to save";
      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col h-full px-6 py-4">
      <input
        className="mb-3 text-lg w-full border-b border-border bg-transparent focus:outline-none text-primary font-semibold placeholder:text-secondary/60"
        placeholder="Title"
        value={title}
        maxLength={120}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isSaving}
        autoFocus
      />
      <textarea
        className="mb-3 flex-1 w-full resize-none bg-surface text-secondary border border-border rounded-lg p-3 focus:outline-accent font-normal"
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={12}
        maxLength={5000}
        disabled={isSaving}
      />
      <div className="flex gap-2 items-center">
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-accent transition text-sm"
          disabled={isSaving}
        >
          {isNew ? "Create" : "Save"}
        </button>
        {!isNew && onDelete && (
          <button
            type="button"
            className="bg-transparent text-accent border border-accent px-3 py-2 rounded hover:bg-accent/10 text-sm"
            onClick={() => {
              if (
                confirm(
                  "Are you sure you want to delete this note? This action cannot be undone."
                )
              ) {
                onDelete();
              }
            }}
            disabled={isSaving}
          >
            Delete
          </button>
        )}
        <button
          type="button"
          className="ml-auto text-secondary px-3 py-2 rounded hover:bg-muted/60 text-sm"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </button>
      </div>
      {error && (
        <div className="text-red-600 p-2 mt-2 bg-red-50 border border-red-200 rounded">
          {error}
        </div>
      )}
    </form>
  );
}

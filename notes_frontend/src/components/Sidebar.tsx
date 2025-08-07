"use client";

import React from "react";
import type { Note } from "../services/NotesService";

type SidebarProps = {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  isLoading: boolean;
};

export function Sidebar({ notes, selectedId, onSelect, onCreate, isLoading }: SidebarProps) {
  return (
    <aside className="flex flex-col min-w-[220px] h-full bg-surface border-r border-border">
      <div className="flex justify-between items-center px-4 py-3 border-b border-border">
        <span className="font-bold text-primary text-lg">My Notes</span>
        <button
          className="rounded bg-accent text-white p-1 pl-2 pr-2 text-sm font-medium shadow hover:bg-primary transition"
          aria-label="Create Note"
          onClick={onCreate}
        >
          +
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-4 text-center text-secondary">Loading...</div>
        ) : notes.length === 0 ? (
          <div className="p-4 text-secondary italic">No notes found.</div>
        ) : (
          <ul>
            {notes.map((note) => (
              <li key={note.id}>
                <button
                  onClick={() => onSelect(note.id)}
                  className={`w-full text-left px-4 py-3 border-b border-border transition bg-transparent hover:bg-muted ${
                    selectedId === note.id ? "bg-accent/10 text-primary font-medium" : ""
                  }`}
                  style={{ outline: "none" }}
                >
                  <div className="truncate">{note.title || <em>(Untitled)</em>}</div>
                  <div className="text-xs text-secondary truncate">{note.content.slice(0, 36)}</div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
}

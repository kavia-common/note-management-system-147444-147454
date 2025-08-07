"use client";

import React from "react";
import { useNotes } from "../hooks/useNotes";
import { Sidebar } from "../components/Sidebar";
import { NotesPanel } from "../components/NotesPanel";
import { TopBar } from "../components/TopBar";

export default function Home() {
  const {
    notes,
    isLoading,
    error,
    selectedId,
    selectNote,
    create,
    update,
    remove,
    searchNotes,
    search,
  } = useNotes();

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar
        notes={notes}
        selectedId={selectedId}
        onSelect={selectNote}
        onCreate={() => selectNote("")}
        isLoading={isLoading}
      />
      <div className="flex flex-col flex-1 h-full min-h-screen">
        <TopBar onSearch={searchNotes} search={search} isLoading={isLoading} />
        <NotesPanel
          notes={notes}
          selectedId={selectedId}
          onSelect={selectNote}
          create={create}
          update={update}
          remove={remove}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}

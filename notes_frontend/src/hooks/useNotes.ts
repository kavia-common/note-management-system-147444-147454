import { useState, useCallback, useEffect } from "react";
import {
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
  Note,
  NoteInput,
} from "../services/NotesService";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  const loadNotes = useCallback(async (query?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchNotes(query || "");
      setNotes(res);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load notes";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotes(search);
  }, [loadNotes, search]);

  const selectNote = (id: string) => {
    setSelectedId(id);
  };

  const create = async (input: NoteInput) => {
    setIsLoading(true);
    try {
      const note = await createNote(input);
      setNotes((n) => [note, ...n]);
      setSelectedId(note.id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to create note";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const update = async (id: string, input: NoteInput) => {
    setIsLoading(true);
    try {
      const note = await updateNote(id, input);
      setNotes((n) => n.map((x) => (x.id === id ? note : x)));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update note";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const remove = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteNote(id);
      setNotes((n) => n.filter((x) => x.id !== id));
      // deselect if the removed note was selected
      if (selectedId === id) setSelectedId(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete note";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const searchNotes = (query: string) => {
    setSearch(query);
  };

  return {
    notes,
    isLoading,
    error,
    selectedId,
    selectNote,
    create,
    update,
    remove,
    searchNotes,
    setSearch,
    search,
  };
}

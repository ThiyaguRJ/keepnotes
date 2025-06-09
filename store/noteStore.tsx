import { create } from "zustand";

type Note = {
  _id: string;
  title: string;
  content: string;
};

type NoteState = {
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
};

export const useNoteStore = create<NoteState>((set) => ({
  selectedNote: null,
  setSelectedNote: (note) => {
    set({ selectedNote: note });
  },
}));

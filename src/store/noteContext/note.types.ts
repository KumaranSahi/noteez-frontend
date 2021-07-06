import { ReactNode, Dispatch } from "react";

export type Props = {
  children?: ReactNode;
};

export type Note = {
  id: string;
  title: string;
  content: string;
};

export type NoteListInfo = {
  ok: boolean;
  message: string;
  notes: Note[];
};

export type NewNoteInfo = {
  id: string;
  content: string;
  title: string;
  ok: boolean;
  message: string;
};

export type NoteAction =
  | { type: "ADD_NEW_NOTE"; payload: Note }
  | { type: "ADD_NOTE_LIST"; payload: Note[] };

export type NoteContextType = {
  notes: Note[];
  addNewNote: (
    newNoteInfo: NewNoteInfo,
    noteDispatch: Dispatch<NoteAction>,
    push: any
  ) => void;
  noteDispatch: Dispatch<NoteAction>;
};

export type NoteState = {
  notes: Note[];
};

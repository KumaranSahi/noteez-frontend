import { NoteState, NoteAction } from "../note.types";

export const noteReducer = (state: NoteState, action: NoteAction) => {
  switch (action.type) {
    case "ADD_NOTE_LIST":
      return {
        ...state,
        notes: [...action.payload],
      };
    case "ADD_NEW_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case "EDIT_NOTE":
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter(({ id }) => id !== action.payload),
      };
    default:
      return state;
  }
};

import { useContext, createContext, useReducer, FC } from "react";
import { NoteContextType, NoteState, Props } from "./note.types";
import { noteReducer } from "./noteReducer/noteReducer";
import { addNewNote } from "./noteMethods";

export const NoteContext = createContext({});

export const useNote = () => useContext(NoteContext) as NoteContextType;

export const initialState: NoteState = {
  notes: [],
};

export const NoteContextProvider: FC = ({ children }: Props) => {
  const [state, dispatch] = useReducer(noteReducer, initialState);
  return (
    <NoteContext.Provider
      value={{
        ...state,
        addNewNote: addNewNote,
        noteDispatch: dispatch,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

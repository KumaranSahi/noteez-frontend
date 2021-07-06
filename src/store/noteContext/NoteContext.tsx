import { useContext, createContext, useReducer, FC, useEffect } from "react";
import { NoteContextType, NoteState, Props } from "./note.types";
import { noteReducer } from "./noteReducer/noteReducer";
import { addNewNote, loadNotes } from "./noteMethods";
import { useQuery } from "@apollo/client";
import { FETCH_NOTES } from "../../graphql/note";
import { useHistory } from "react-router-dom";

export const NoteContext = createContext({});

export const useNote = () => useContext(NoteContext) as NoteContextType;

export const initialState: NoteState = {
  notes: [],
};

export const NoteContextProvider: FC = ({ children }: Props) => {
  const [state, dispatch] = useReducer(noteReducer, initialState);
  const { data } = useQuery(FETCH_NOTES);
  const { push } = useHistory();

  useEffect(() => {
    if (data) loadNotes(data.fetchNotes, dispatch, push);
  }, [data, push]);

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

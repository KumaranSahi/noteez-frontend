import { useContext, createContext, useReducer, FC, useEffect } from "react";
import { NoteContextType, NoteState, Props } from "./note.types";
import { noteReducer } from "./noteReducer/noteReducer";
import { addNewNote, loadNotes, editNote, deleteNote } from "./noteMethods";
import { useLazyQuery } from "@apollo/client";
import { FETCH_NOTES } from "../../graphql/note";
import { useHistory } from "react-router-dom";
import { useAuth } from "../authContext/AuthContext";

export const NoteContext = createContext({});

export const useNote = () => useContext(NoteContext) as NoteContextType;

export const initialState: NoteState = {
  notes: [],
};

export const NoteContextProvider: FC = ({ children }: Props) => {
  const [state, dispatch] = useReducer(noteReducer, initialState);
  const [signinQuery, { loading }] = useLazyQuery(FETCH_NOTES, {
    onCompleted: (data) => {
      loadNotes(data.fetchNotes, dispatch, push);
    },
  });
  const { push } = useHistory();
  const { token } = useAuth();

  useEffect(() => {
    if (token) signinQuery();
  }, [push, token, signinQuery]);

  return (
    <NoteContext.Provider
      value={{
        ...state,
        addNewNote: addNewNote,
        editNote: editNote,
        deleteNote: deleteNote,
        noteDispatch: dispatch,
        noteLoading: loading,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

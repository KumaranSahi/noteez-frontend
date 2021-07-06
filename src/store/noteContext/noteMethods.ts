import { Dispatch } from "react";
import {
  successToast,
  warningToast,
  // infoToast
} from "../../components";
import { NewNoteInfo, NoteAction, NoteListInfo } from "./note.types";

export const loadNotes = (
  noteListInfo: NoteListInfo,
  noteDispatch: Dispatch<NoteAction>,
  push: any
) => {
  if (noteListInfo.ok) {
    noteDispatch({
      type: "ADD_NOTE_LIST",
      payload: noteListInfo.notes,
    });
  } else {
    switch (noteListInfo.message) {
      case "UNAUTHORIZED":
        push("/sign-up");
        break;
      default:
        warningToast("Unable add note please try again later");
    }
  }
};

export const addNewNote = (
  newNoteInfo: NewNoteInfo,
  noteDispatch: Dispatch<NoteAction>,
  push: any
) => {
  if (newNoteInfo.ok) {
    noteDispatch({
      type: "ADD_NEW_NOTE",
      payload: {
        content: newNoteInfo.content,
        id: newNoteInfo.id,
        title: newNoteInfo.title,
      },
    });
    successToast("Note added");
  } else {
    switch (newNoteInfo.message) {
      case "UNAUTHORIZED":
        push("/sign-up");
        break;
      default:
        warningToast("Unable add note please try again later");
    }
  }
};

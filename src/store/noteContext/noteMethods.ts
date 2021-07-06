import { Dispatch } from "react";
import { 
    // successToast, 
    warningToast, 
    // infoToast 
} from "../../components";
import { NewNoteInfo, NoteAction } from "./note.types";

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

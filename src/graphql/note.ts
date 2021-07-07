import { gql } from "@apollo/client";

export const CREATE_NOTE = gql`
  mutation CreateNote($title: String, $content: String) {
    createNote(title: $title, content: $content) {
      id
      content
      title
      ok
      message
    }
  }
`;

export const FETCH_NOTES = gql`
  query {
    fetchNotes {
      ok
      message
      notes {
        id
        content
        title
      }
    }
  }
`;

export const EDIT_NOTES = gql`
  mutation EditNote($title: String, $content: String, $noteId: String) {
    editNote(title: $title, content: $content, noteId: $noteId) {
      id
      content
      title
      ok
      message
    }
  }
`;

export const DELETE_NOTES = gql`
  mutation DeleteNote($noteId: String) {
    deleteNote(noteId: $noteId) {
      id
      ok
      message
    }
  }
`;

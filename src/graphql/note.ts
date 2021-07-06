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

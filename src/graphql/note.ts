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

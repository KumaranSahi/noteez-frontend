import { Box, Badge, Container } from "@chakra-ui/react";

export type NoteType = {
  title: string;
  id: string;
  content: string;
  selectNote: (id: string) => void;
};

export const Note = ({ content, id, title, selectNote }: NoteType) => {
  return (
    <Box
      boxShadow="dark-lg"
      padding="4"
      margin="1"
      marginBottom="4"
      onClick={() => selectNote(id)}
      cursor="pointer"
    >
      <Badge fontSize="larger">{title}</Badge>
      <Container fontSize="larger">{content}</Container>
    </Box>
  );
};

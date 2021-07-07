import { Box, Heading, Container } from "@chakra-ui/react";

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
      <Heading fontSize="larger" color="teal" margin="4">
        {title}
      </Heading>
      <Container fontSize="larger">{content}</Container>
    </Box>
  );
};

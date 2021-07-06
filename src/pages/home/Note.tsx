import { Box, Badge, Container } from "@chakra-ui/react";

export type NoteType = {
  title: string;
  id: string;
  content: string;
};

export const Note = ({ content, id, title }: NoteType) => {
  return (
    <Box boxShadow="dark-lg" padding="4" margin="1">
      <Badge fontSize="larger">{title}</Badge>
      <Container fontSize="larger">{content}</Container>
    </Box>
  );
};

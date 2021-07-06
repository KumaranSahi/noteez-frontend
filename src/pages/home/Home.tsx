import { useState } from "react";
import { Box, VStack } from "@chakra-ui/react";
import { NoteEditor } from "./NoteEditor";
import { AddNotes } from "./AddNotes";
import Masonry from "react-masonry-css";
import { Note } from "./Note";
import { useNote } from "../../store";

export const Home = () => {
  const [open, setOpen] = useState(false);
  const { notes } = useNote();

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <VStack>
      <AddNotes />
      <Box width="100vw" height="100%">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.map(({ content, title, id }) => (
            <Note key={id} content={content} id={id} title={title} />
          ))}
        </Masonry>
      </Box>
      <NoteEditor isOpen={open} onClose={() => setOpen(false)} />
    </VStack>
  );
};

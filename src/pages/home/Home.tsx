import { useState } from "react";
import { Box, VStack } from "@chakra-ui/react";
import { NoteEditor } from "./NoteEditor";
import { AddNotes } from "./AddNotes";
import Masonry from "react-masonry-css";
import { Note } from "./Note";
import { useNote } from "../../store";
import { Spinner } from "../../components";

export const Home = () => {
  const [selectedNote, setSelectedNote] = useState("");
  const { notes, noteLoading } = useNote();

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <VStack>
      <AddNotes />
      <Box width="95vw" height="100%">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {notes.map(({ content, title, id }) => (
            <Note
              key={id}
              content={content}
              id={id}
              title={title}
              selectNote={(id: string) => setSelectedNote(id)}
            />
          ))}
        </Masonry>
      </Box>
      <NoteEditor
        isOpen={selectedNote.length > 0}
        onClose={() => setSelectedNote("")}
        noteId={selectedNote}
      />
      {noteLoading && <Spinner />}
    </VStack>
  );
};

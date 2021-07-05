import { useState } from "react";
import { Container, Box, Badge } from "@chakra-ui/react";
import { NoteEditor } from "./NoteEditor";
import Masonry from "react-masonry-css";

export const Home = () => {
  const [open, setOpen] = useState(false);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <>
      <Box width="100%" height="100%">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          <Box
            boxShadow="dark-lg"
            padding="4"
            borderRadius="2xl"
            onClick={() => setOpen(true)}
            margin="1"
          >
            <Badge fontSize="larger">Note Title</Badge>
            <Container fontSize="larger">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, ab
              harum. Ex et, praesentium facilis voluptatum natus similique
              suscipit ratione voluptates molestiae incidunt blanditiis. Ea
              corrupti ipsam consectetur molestias enim.
            </Container>
          </Box>
          <Box
            boxShadow="dark-lg"
            padding="4"
            borderRadius="2xl"
            onClick={() => setOpen(true)}
            margin="1"
          >
            <Badge fontSize="larger">Note Title</Badge>
            <Container fontSize="larger">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, ab
              harum. Ex et, praesentium facilis voluptatum natus similique
              suscipit ratione voluptates molestiae incidunt blanditiis. Ea
              corrupti ipsam consectetur molestias enim.
            </Container>
          </Box>
        </Masonry>
      </Box>
      <NoteEditor isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

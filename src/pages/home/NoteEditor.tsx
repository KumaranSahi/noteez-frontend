import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
//   ModalCloseButton,
  ModalBody,
//   ModalFooter,
//   Button,
  Textarea,
  Input,
} from "@chakra-ui/react";

export type NoteEditorProps = {
  isOpen: boolean;
  onClose: () => void;
  //   noteId: string;
};

export const NoteEditor = ({ isOpen, onClose }: NoteEditorProps) => {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Input placeholder="Basic usage" />
          </ModalHeader>
          <ModalBody>
            <Textarea placeholder="Here is a sample placeholder" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

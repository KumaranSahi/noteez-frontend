import { useMutation } from "@apollo/client";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalBody,
  FormErrorMessage,
  Button,
  FormControl,
  Textarea,
  Input,
  HStack,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { EDIT_NOTES } from "../../graphql/note";
import { useNote } from "../../store";

export type NoteEditorProps = {
  isOpen: boolean;
  onClose: () => void;
  noteId: string;
};

export const NoteEditor = ({ isOpen, onClose, noteId }: NoteEditorProps) => {
  const { notes, editNote, noteDispatch } = useNote();
  const noteToEdit = {
    title: "",
    content: "",
  };
  const { push } = useHistory();
  const [editNoteMutation] = useMutation(EDIT_NOTES);
  /* eslint-disable */
  useEffect(() => {
    let note = notes.find(({ id }) => id === noteId);
    if (note) {
      noteToEdit.content = note.content;
      noteToEdit.title = note.title;
    }
  }, [notes, noteId]);

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Formik
            initialValues={noteToEdit}
            onSubmit={(values, actions) => {
              try {
                actions.setSubmitting(true);
                editNoteMutation({
                  variables: {
                    title: values.title,
                    content: values.content,
                    noteId: noteId,
                  },
                  update: (_, data) => {
                    if (data) {
                      const noteData = data.data!.editNote;
                      editNote(
                        {
                          title: noteData.title,
                          content: noteData.content,
                          id: noteData.id,
                          message: noteData.message,
                          ok: noteData.ok,
                        },
                        noteDispatch,
                        push
                      );
                      
                      actions.setSubmitting(false);
                    }
                  },
                });
                onClose();
              } catch (error) {
                console.log(error);
                actions.setSubmitting(false);
              }
            }}
          >
            {(props) => (
              <Form>
                <ModalHeader>
                  <Field name="title">
                    {({ field, form: { errors, touched } }: FieldProps) => (
                      <FormControl
                        isInvalid={(errors.title && touched.title) as boolean}
                      >
                        <Input
                          {...field}
                          placeholder="Note title"
                          margin="1"
                          border="0"
                          id="note-title"
                        />
                        <FormErrorMessage>{errors.title}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalHeader>
                <ModalBody>
                  <Field name="content">
                    {({ field, form: { errors, touched } }: FieldProps) => (
                      <FormControl
                        isInvalid={
                          (errors.content && touched.content) as boolean
                        }
                      >
                        <Textarea
                          {...field}
                          placeholder="Write your note here!"
                          margin="1"
                          border="0"
                          id="note-content"
                        />
                        <FormErrorMessage>{errors.content}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </ModalBody>
                <HStack justifyContent="space-between">
                  <Button
                    isLoading={props.isSubmitting}
                    type="submit"
                    colorScheme="teal"
                    loadingText="Adding Note"
                    margin="1"
                    variant="ghost"
                  >
                    Add Note
                  </Button>
                  <Button
                    isLoading={props.isSubmitting}
                    colorScheme="red"
                    loadingText="Deleting note"
                    margin="1"
                    variant="ghost"
                  >
                    Delete Note
                  </Button>
                </HStack>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

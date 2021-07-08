import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Textarea,
  Input,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import { useHistory } from "react-router-dom";
import { CREATE_NOTE } from "../../graphql/note";
import { useNote } from "../../store";

export const AddNotes = () => {
  const { addNewNote, noteDispatch } = useNote();
  const { push } = useHistory();
  const [createNoteMutation] = useMutation(CREATE_NOTE);
  return (
    <Box
      margin="1"
      boxShadow="dark-lg"
      padding="2"
      width={{ base: "90%", sm: "50%" }}
    >
      <Formik
        initialValues={{ title: "", content: "" }}
        onSubmit={(values, actions) => {
          try {
            actions.setSubmitting(true);
            createNoteMutation({
              variables: {
                title: values.title,
                content: values.content,
              },
              update: (_, data) => {
                if (data) {
                  const noteData = data.data!.createNote;
                  addNewNote(
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
                  actions.resetForm();
                }
              },
            });
          } catch (error) {
            console.log(error);
            actions.setSubmitting(false);
          }
        }}
      >
        {(props) => (
          <Form>
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
            <Field name="content">
              {({ field, form: { errors, touched } }: FieldProps) => (
                <FormControl
                  isInvalid={(errors.content && touched.content) as boolean}
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
          </Form>
        )}
      </Formik>
    </Box>
  );
};

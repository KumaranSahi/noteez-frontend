import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  Button,
  InputRightElement,
} from "@chakra-ui/react";
import { Formik, Form, Field, FieldProps } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { emailValidation, nameValidation, passwordValidation } from "./utils";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../../../graphql/auth";
import { useAuth } from "../../../store";

export const SignupContainer = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUpUserMutation] = useMutation(SIGN_UP);

  const { signUpUser, setCurrentPage } = useAuth();

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "" }}
      onSubmit={(values, actions) => {
        try {
          actions.setSubmitting(true);
          signUpUserMutation({
            variables: {
              name: values.name,
              email: values.email,
              password: values.password,
            },
            update: (_, data) => {
              if (data) {
                const userData = data.data!.signupUser;
                signUpUser(
                  {
                    message: userData.message,
                    ok: userData.ok,
                  },
                  setCurrentPage
                );
                actions.setSubmitting(false);
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
          <Field name="name" validate={nameValidation}>
            {({ field, form: { errors, touched } }: FieldProps) => (
              <FormControl
                isInvalid={(errors.email && touched.email) as boolean}
              >
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input {...field} id="name" placeholder="name" />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="email" validate={emailValidation}>
            {({ field, form: { errors, touched } }: FieldProps) => (
              <FormControl
                isInvalid={(errors.email && touched.email) as boolean}
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...field} id="email" placeholder="email" />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password" validate={passwordValidation}>
            {({ field, form: { errors, touched } }: FieldProps) => (
              <FormControl
                isInvalid={(errors.password && touched.password) as boolean}
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={showPassword ? "text" : "password"}
                    {...field}
                    id="password"
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword((state) => !state)}
                    >
                      {showPassword ? (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      ) : (
                        <FontAwesomeIcon icon={faEye} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

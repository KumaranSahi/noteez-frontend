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
import { emailValidation } from "./utils";
import { SIGN_IN } from "../../../graphql/auth";
import { useLazyQuery } from "@apollo/client";
import { useAuth } from "../../../store";
import { useHistory } from "react-router-dom";

export const SigninContainer = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser, dispatch: authDispatch } = useAuth();
  const { push } = useHistory();
  const [signinQuery, { loading }] = useLazyQuery(SIGN_IN, {
    onCompleted: (data) => {
      const signedInUserData = data.signinUser;
      signInUser(authDispatch, {
        message: signedInUserData.message,
        ok: signedInUserData.ok,
        token: signedInUserData.token,
        userName: signedInUserData.name,
      });
      push("/");
    },
  });
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={(values, actions) => {
        try {
          actions.setSubmitting(true);
          signinQuery({
            variables: {
              email: values.email,
              password: values.password,
            },
          });
          if (!loading) actions.setSubmitting(false);
        } catch (error) {
          console.log(error);
          actions.setSubmitting(false);
        }
      }}
    >
      {(props) => (
        <Form>
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
          <Field name="password">
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

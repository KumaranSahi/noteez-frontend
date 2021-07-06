import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignupUser($name: String, $email: String, $password: String) {
    signupUser(name: $name, email: $email, password: $password) {
      ok
      message
    }
  }
`;

export const SIGN_IN = gql`
  query SigninUser($email: String, $password: String) {
    signinUser(email: $email, password: $password) {
      ok
      message
      token
      name
    }
  }
`;

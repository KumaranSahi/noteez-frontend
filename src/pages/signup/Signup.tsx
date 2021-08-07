import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { useAuth } from "../../store";
import { SigninPages } from "../../store/authContext/auth.types";
import {
  ConfirmPasswordContainer,
  SigninContainer,
  SignupContainer,
} from "./signupPageComponents";
import { GUEST_SIGN_IN } from "../../graphql/auth";
import { useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

export const Signup = () => {
  const { currentPage, setCurrentPage } = useAuth();
  const { signInUser, dispatch: authDispatch } = useAuth();
  const { push } = useHistory();

  const [guestSigninQuery, { loading }] = useLazyQuery(GUEST_SIGN_IN, {
    onCompleted: (data) => {
      const signedInUserData = data.signinGuest;
      signInUser(authDispatch, {
        message: signedInUserData.message,
        ok: signedInUserData.ok,
        token: signedInUserData.token,
        userName: signedInUserData.name,
      });
      push("/");
    },
  });

  const pageToRender = (currentPage: SigninPages) => {
    switch (currentPage) {
      case "SIGNUP_PAGE":
        return <SignupContainer />;
      case "SIGNIN_PAGE":
        return <SigninContainer />;
      case "CHANGE_PASSWORD":
        return <ConfirmPasswordContainer />;
      default:
        return <SignupContainer />;
    }
  };

  return (
    <Flex
      boxShadow="dark-lg"
      p="6"
      rounded="md"
      height="23rem"
      width="21rem"
      textAlign="center"
      flexDirection="column"
      justifyContent="space-between"
    >
      {pageToRender(currentPage)}
      <Box>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={loading}
          loadingText="Loging in as guest"
          onClick={() => guestSigninQuery()}
        >
          Login as guest
        </Button>
        {currentPage === "SIGNIN_PAGE" && (
          <Text
            onClick={() => setCurrentPage("CHANGE_PASSWORD")}
            cursor="pointer"
          >
            Forgot Password
          </Text>
        )}
        {currentPage === "SIGNIN_PAGE" ? (
          <Text onClick={() => setCurrentPage("SIGNUP_PAGE")} cursor="pointer">
            New to Noteez? Sign up!
          </Text>
        ) : (
          <Text onClick={() => setCurrentPage("SIGNIN_PAGE")} cursor="pointer">
            Already have an Account? Sign In!
          </Text>
        )}
      </Box>
    </Flex>
  );
};

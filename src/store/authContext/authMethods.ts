import {
  AuthAction,
  SignedUpInfo,
  SigninPages,
  ChangePassword,
  SigninUser,
  // SignedInUserInfo,
} from "./auth.types";
import { Dispatch, SetStateAction } from "react";
import { successToast, warningToast, infoToast } from "../../components";

export const signUpUser = async (
  signedUpInfo: SignedUpInfo,
  setCurrentPage: Dispatch<SetStateAction<SigninPages>>
) => {
  if (signedUpInfo.ok) {
    successToast("User signed up successfully!");
    setCurrentPage("SIGNIN_PAGE");
  } else {
    switch (signedUpInfo.message) {
      case "INVALID_INPUT":
        warningToast("Check your details and try again");
        break;
      case "USER_EXISTS":
        infoToast("User already exists please try signing in");
        break;
      default:
        infoToast("Internal server error please try again later");
        break;
    }
  }
};

export const checkAuthTimeout = (
  expirationTime: number,
  dispatch: Dispatch<AuthAction>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setTimeout(() => {
    signOutUser(dispatch, setLoading);
  }, expirationTime * (24 * 1000));
};

export const signOutUser = (
  dispatch: Dispatch<AuthAction>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  localStorage.clear();
  // setupAuthHeaderForServiceCalls(null);
  dispatch({
    type: "SIGNOUT_USER",
  });
  setLoading(false);
};

export const changePassword = async (
  userData: ChangePassword,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setCurrentPage: Dispatch<SetStateAction<SigninPages>>
) => {
  setLoading(true);
  try {
  } catch (error) {
    warningToast("Unable to change password please try again later");
    console.log(error);
    setLoading(false);
  }
};

export const onReload = (
  dispatch: Dispatch<AuthAction>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  const token = localStorage.getItem("token");
  let date = localStorage.getItem("expiresIn");
  let expiresIn: Date = new Date();
  if (date) expiresIn = new Date(date);
  if (expiresIn <= new Date()) {
    signOutUser(dispatch, setLoading);
  } else {
    const userName = localStorage.getItem("userName");
    checkAuthTimeout(
      (expiresIn.getTime() - new Date().getTime()) / 1000,
      dispatch,
      setLoading
    );
    // setupAuthHeaderForServiceCalls(token!);
    dispatch({
      type: "SIGNIN_USER",
      payload: {
        token: token,
        userName: userName,
        expiresIn: expiresIn,
      },
    });
  }
};

export const signInUser = async (
  emailAndPassword: SigninUser,
  dispatch: Dispatch<AuthAction>,
  setLoading: Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    setLoading(false);
  } catch (error) {
    warningToast("Invalid username or password");
    console.log(error);
    setLoading(false);
  }
};

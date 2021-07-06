import {
  AuthAction,
  SignedUpInfo,
  SigninPages,
  ChangePassword,
  SignedInUserInfo,
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
  dispatch: Dispatch<AuthAction>
) => {
  setTimeout(() => {
    signOutUser(dispatch);
  }, expirationTime * 1000);
};

export const signOutUser = (dispatch: Dispatch<AuthAction>) => {
  localStorage.clear();
  dispatch({
    type: "SIGNOUT_USER",
  });
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

export const onReload = (dispatch: Dispatch<AuthAction>) => {
  const token = localStorage.getItem("token");
  let date = localStorage.getItem("expiresIn");
  let expiresIn: Date = new Date();
  if (date) expiresIn = new Date(date);
  if (expiresIn <= new Date()) {
    signOutUser(dispatch);
  } else {
    const userName = localStorage.getItem("userName");
    checkAuthTimeout(
      ((expiresIn.getTime() - new Date().getTime()) / 1000) * 24,
      dispatch
    );
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
  dispatch: Dispatch<AuthAction>,
  signedInuserInfo: SignedInUserInfo
) => {
  if (signedInuserInfo.ok) {
    successToast("User signed up successfully!");
    localStorage.setItem("token", signedInuserInfo.token);
    localStorage.setItem("userName", signedInuserInfo.userName);
    const expiresIn = new Date(new Date().getTime() + 24 * 3600000);
    localStorage.setItem("expiresIn", "" + expiresIn);
    checkAuthTimeout(24 * 3600, dispatch);
    dispatch({
      type: "SIGNIN_USER",
      payload: {
        token: signedInuserInfo.token,
        userName: signedInuserInfo.userName,
        expiresIn: new Date(expiresIn),
      },
    });
  } else {
    switch (signedInuserInfo.message) {
      case "INVALID_USERNAME_PASSWORD":
        warningToast("Invalid email/password");
        break;
      default:
        infoToast("Internal server error please try again later");
        break;
    }
  }
};

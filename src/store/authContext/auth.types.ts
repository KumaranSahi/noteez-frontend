import { ReactNode, Dispatch, SetStateAction } from "react";

export type Props = {
  children?: ReactNode;
};

export type AuthContextType = {
  token: string;
  userName: string;
  signUpUser: (
    signedUpInfo: SignedUpInfo,
    setCurrentPage: Dispatch<SetStateAction<SigninPages>>
  ) => void;
  signInUser: (
    dispatch: Dispatch<AuthAction>,
    signedInuserInfo: SignedInUserInfo
  ) => void;
  signOutUser: (dispatch: Dispatch<AuthAction>) => void;
  currentPage: SigninPages;
  changePassword: (
    changePasswordInfo: ChangePasswordInfo,
    setCurrentPage: Dispatch<SetStateAction<SigninPages>>
  ) => void;
  setCurrentPage: Dispatch<SetStateAction<SigninPages>>;
  dispatch: Dispatch<AuthAction>;
};

export type State = {
  token: string | null;
  userName: string | null;
  expiresIn: Date | null;
};

export type AuthAction =
  | { type: "SIGNIN_USER"; payload: State }
  | { type: "SIGNOUT_USER" };

export type SigninPages = "SIGNIN_PAGE" | "SIGNUP_PAGE" | "CHANGE_PASSWORD";

export type SignedUpInfo = {
  ok: boolean;
  message: string;
};

export type SigninUser = {
  email: string;
  password: string;
};

export type ChangePasswordInfo = {
  ok: boolean;
  message: string;
};

export type SignedInUserInfo = {
  token: string;
  userName: string;
  ok: boolean;
  message: string;
};

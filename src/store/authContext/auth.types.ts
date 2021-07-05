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
    emailAndPassword: SigninUser,
    dispatch: Dispatch<AuthAction>,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => void;
  signOutUser: (
    dispatch: Dispatch<AuthAction>,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => void;
  currentPage: SigninPages;
  changePassword: (
    userData: ChangePassword,
    setLoading: Dispatch<SetStateAction<boolean>>
  ) => void;
  setCurrentPage: Dispatch<SetStateAction<SigninPages>>;
  authLoading: boolean;
  setAuthLoading: Dispatch<SetStateAction<boolean>>;
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

export type ChangePassword = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignedInUserInfo = {
  token: string;
  userName: string;
  expiresIn: Date;
};

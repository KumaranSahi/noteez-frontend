import {
  useContext,
  createContext,
  useReducer,
  FC,
  useState,
  useEffect,
} from "react";
import { Props, State, SigninPages, AuthContextType } from "./auth.types";
import {
  signUpUser,
  signOutUser,
  changePassword,
  onReload,
  signInUser,
} from "./authMethods";
import { authReducer } from "./authReducer/authReducer";

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext) as AuthContextType;

export const initialState: State = {
  token: null,
  userName: null,
  expiresIn: null,
};

export const AuthContextProvider: FC = ({ children }: Props) => {
  const [currentPage, setCurrentPage] = useState<SigninPages>("SIGNIN_PAGE");

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    onReload(dispatch);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        userName: state.userName,
        signUpUser: signUpUser,
        signInUser: signInUser,
        signOutUser: signOutUser,
        currentPage: currentPage,
        changePassword: changePassword,
        setCurrentPage: setCurrentPage,
        dispatch: dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

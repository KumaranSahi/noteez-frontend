import { authReducer } from "./authReducer";
import { AuthAction, State } from "../auth.types";

const initialState: State = {
  token: null,
  userName: null,
  expiresIn: null,
};

describe("Testing Auth Reducer", () => {
  test("Sign in user test", () => {
    const action: AuthAction = {
      type: "SIGNIN_USER",
      payload: {
        token: "JWT token",
        userName: "userName",
        expiresIn: new Date("1998"),
      },
    };
    const reducerOutput = authReducer(initialState, action);

    expect(reducerOutput).toEqual({
      token: "JWT token",
      userName: "userName",
      expiresIn: new Date("1998"),
    });
  });

  test("Should Sign out user", () => {
    const signinAction: AuthAction = {
      type: "SIGNIN_USER",
      payload: {
        token: "JWT token",
        userName: "userName",
        expiresIn: new Date("1998"),
      },
    };
    const signinActionOutput = authReducer(initialState, signinAction);
    const signoutAction: AuthAction = {
      type: "SIGNOUT_USER",
    };
    const signoutActionOutput = authReducer(signinActionOutput, signoutAction);
    expect(signoutActionOutput).toEqual(initialState);
  });
});

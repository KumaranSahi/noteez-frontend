import { Navbar } from "./components";
import "./App.css";
import { VStack } from "@chakra-ui/react";
import { Signup, Home } from "./pages";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { NoteContextProvider } from "./store";

function App() {
  const PrivateLink = ({ ...props }) => {
    const token = localStorage.getItem("token");
    const { push } = useHistory();
    useEffect(() => {
      if (!token) push("/sign-up");
    }, [token, push]);
    return <Route {...props} />;
  };

  const LockSignup = ({ ...props }) => {
    const token = localStorage.getItem("token");
    return token ? <Redirect to="/" /> : <Route {...props} />;
  };

  return (
    <VStack height="100%" width="100%">
      <Navbar />
      <NoteContextProvider>
        <Switch>
          <LockSignup path="/sign-up" component={Signup} />
          <PrivateLink path="/" component={Home} />
        </Switch>
      </NoteContextProvider>
    </VStack>
  );
}

export default App;

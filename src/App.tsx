import { Navbar } from "./components";
import "./App.css";
import { VStack } from "@chakra-ui/react";
import { Signup } from "./pages";
import { Switch, Route, useHistory, Redirect } from "react-router-dom";
import { useEffect } from "react";

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
    <VStack h="100%">
      <Navbar />
      <Switch>
        <LockSignup path="/sign-up" component={Signup} />
      </Switch>
    </VStack>
  );
}

export default App;

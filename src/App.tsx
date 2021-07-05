import { Navbar } from "./components";
import "./App.css";
import { VStack } from "@chakra-ui/react";
import { Signup, Home } from "./pages";
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
    <VStack height="100%" width="100%">
      <Navbar />
      <Switch>
        <LockSignup path="/sign-up" component={Signup} />
        <Route path="/" component={Home} />
      </Switch>
    </VStack>
  );
}

export default App;

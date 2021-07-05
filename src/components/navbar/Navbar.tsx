import { Heading, HStack, Button, useColorMode } from "@chakra-ui/react";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserAvatar } from "./Avatar";
import { useLocation } from "react-router-dom";

export const Navbar = () => {
  const { pathname } = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack w="100%" justifyContent="space-between" padding="2">
      <Heading>NoteEz</Heading>
      <HStack marginEnd="2">
        <Button onClick={toggleColorMode} borderRadius="full">
          {" "}
          {colorMode === "light" ? (
            <FontAwesomeIcon icon={faMoon} size="2x" />
          ) : (
            <FontAwesomeIcon icon={faSun} size="2x" />
          )}
        </Button>
        {pathname !== "/sign-up" && <UserAvatar />}
      </HStack>
    </HStack>
  );
};

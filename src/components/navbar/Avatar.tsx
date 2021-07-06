import {
  Avatar,
  WrapItem,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../store";

export const UserAvatar = () => {
  const { userName, signOutUser, dispatch: authDispatch } = useAuth();
  const { push } = useHistory();
  return (
    <>
      <Menu>
        <WrapItem>
          <Avatar name={userName} as={MenuButton} />
        </WrapItem>
        <MenuList>
          <MenuItem
            onClick={() => {
              signOutUser(authDispatch);
              push("/sign-up");
            }}
          >
            Sign out
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

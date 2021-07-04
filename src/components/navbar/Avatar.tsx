import {
  Avatar,
  WrapItem,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
} from "@chakra-ui/react";

export const UserAvatar = () => {
  return (
    <>
      <Menu>
        <WrapItem>
          <Avatar name="Sahithi Kumaran" as={MenuButton} />
        </WrapItem>
        <MenuList>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

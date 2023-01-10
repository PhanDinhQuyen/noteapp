import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { Avatar, Box, Menu, Typography, MenuItem } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
function UserMenu() {
  const [user] = useContext(AuthContext).user;
  const { displayName, photoURL, auth } = user;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    auth.signOut();
    window.location.assign("/login");
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography variant='p' color='initial'>
          {displayName}
        </Typography>

        <Avatar
          variant='circular'
          alt=''
          src={photoURL}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        />
      </Box>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserMenu;

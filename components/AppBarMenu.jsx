import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Link from "next/link";
import { useRouter } from "next/router";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useSession, signOut } from "next-auth/react";
import { colors } from "@mui/material";

function AppBarMenu() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const pages = session
    ? [
        { name: "Dashboard", href: "/dasboard" },
        { name: "Map", href: "/map" },
        { name: "Mongo", href: "/mongo_docs" },
        { name: "About", href: "/about" },
        { name: "Docs", href: "/documents" },
      ]
    : [];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const theme = createTheme({
    palette: {
      primary: {
        main: colors.grey[300],
      },
    },
    typography: {
      selectedElement: {
        textDecoration: "underline",
        fontWeight: "bold",
        color: colors.common.black,
      },
    },
  });

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOutBtn = (e) => {
    const setting = e.currentTarget.dataset.settingName;
    if (setting === "Logout") return signOut();
    if (setting === "Profile") return router.push("/profile");
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters variant="dense" sx={{ height: 36 }}>
            <img
              src={"/moz-flag.png"}
              width={40}
              height={30}
              style={{ marginRight: 10 }}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              {/* <Link href={"/"} onClick={() => setActiveElement("/")}> */}
              <Link href={"/"}>BUREAU</Link>
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map(({ name, href }) => (
                <Button
                  key={name}
                  onClick={() => router.push(href)}
                  btn-name={name}
                  btn-href={href}
                  sx={{ my: 2, color: "white", display: "block" }}
                  size="small"
                >
                  {name}
                </Button>
              ))}
            </Box>

            {session && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title={session.user.email}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src={session.user.image} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      data-setting-name={setting}
                      onClick={(e) => handleSignOutBtn(e)}
                    >
                      <Avatar />
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              // <AccountMenuItems />
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
export default AppBarMenu;

const AccountMenuItems = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import StorageIcon from "@mui/icons-material/Storage";
import { useRouter } from "next/router";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useMenuItemsStateTracker } from "../context/global_state";
import { Typography } from "@mui/material";

export default function FailedToFetchDialog(props) {
  const [open, setOpen] = useState(true);
  const [activeElement, setActiveElement] = useMenuItemsStateTracker(); //global state controller for the menu items in Navbar
  const router = useRouter();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#01665e",
      },
    },
  });

  const handleClose = (e) => {
    setOpen(false);
    e.preventDefault();
    router.push("/");
    setActiveElement("home_page");
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Unable to fetch data"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>
              O servidor de dados não está disponível. Por favor volte mais
              tarde ou contacte o administrador.
            </p>
            {props.serverMessage && (
              <Typography
                variant="caption"
                sx={{
                  color: "#ef6548",
                  display: "inline-flex",
                  alignItems: "flex-end",
                  flexWrap: "wrap",
                }}
              >
                <StorageIcon sx={{ marginRight: 1 }} />
                Server message: {props.serverMessage}
              </Typography>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

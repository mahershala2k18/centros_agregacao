import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import Chip from "@mui/material/Chip";

export default function BasicPopover({ label, observacao }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Chip
        label={label}
        variant="outlined"
        icon={<InfoIcon />}
        clickable={true}
        color="info"
        onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 1, fontSize: 14 }}>{observacao}.</Typography>
      </Popover>
    </>
  );
}

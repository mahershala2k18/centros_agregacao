import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Music from "@mui/icons-material/MusicNoteRounded";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import _ from "lodash";
import AlertDialog from "./Dialog";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";

const ListComponent = (props) => {
  const handleDeleteIconClick = () => {};

  return (
    <List
      dense={true}
      sx={{
        width: "100%",
        maxWidth: 360,
      }}
    >
      {props._arr.map((element, index) => (
        <>
          <ListItem key={index} id={element._id} name={element.name}>
            <Music />
            <ListItemText
              id={element._id}
              primary={_.upperFirst(element.name)}
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    <Rating name="read-only" value={element.rating} />
                    <br />
                  </Typography>
                  {" — Rated by Mahershala Ali…"} {element.lastModified}
                </>
              }
            />
            <ListItemIcon
              id={element._id}
              data-item-name={element.name}
              data-dev-name="mahershala"
              onClick={(e) => props._handleDelete(e)}
            >
              <DeleteIcon sx={{ color: "#ef6548" }} />
            </ListItemIcon>
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  );
};

export default ListComponent;

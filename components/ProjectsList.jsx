import React from "react";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";

const theme = (activeItem, currentElement) => {
  const style = {
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
    backgroundImage:
      activeItem === _.lowerCase(currentElement) &&
      "linear-gradient(to right, rgb(153,216,201,0.2) , rgb(247,252,253), rgb(255, 255, 255))",
    borderBottom:
      activeItem === _.lowerCase(currentElement) &&
      "solid 2px rgb(0, 88, 37, 0.521)",
    // borderLeft:
    //   activeItem === _.lowerCase(currentElement) &&
    //   "solid 2px rgb(0, 88, 37, 0.521)",
    marginBottom: 1,

    // borderBottomLeftRadius: 5,
  };
  return style;
};

export default function ProjectsList({ documents, activeItem, handleClick }) {
  const docsPerProject = Object.entries(
    documents
      .map(({ doc_type, project }) => {
        return project;
      })
      .reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
      }, {})
  );

  console.log(docsPerProject);

  return (
    <MenuList sx={{ width: "70%" }}>
      {docsPerProject.map(([projectName, totalDocs], index) => (
        <MenuItem
          key={index}
          onClick={handleClick}
          data-item-project-name={_.lowerCase(projectName)}
          sx={theme(activeItem, projectName)}
        >
          <ListItemAvatar>
            <Avatar alt={"props.name"}>
              <Image src="/terranossa.png" alt="icon" width={40} height={40} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={_.upperCase(projectName)}
            // secondary={"Total:" + projectName[1]}
          />
          <Typography variant="caption" color="text.secondary">
            Total:{totalDocs}
          </Typography>
        </MenuItem>
      ))}
    </MenuList>
  );
}

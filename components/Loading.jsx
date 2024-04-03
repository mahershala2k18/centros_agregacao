import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 4,
  [`& .${linearProgressClasses.bar}`]: {
    // borderRadius: 5,
    boxShadow:
      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    backgroundColor: "#308fe8",
  },
}));
export default function LinearIndeterminate({ image }) {
  return (
    <>
      <Box sx={{ width: "100%", textAlign: "center", color: "#636363" }}>
        <BorderLinearProgress />
        <Typography variant="caption">Please Wait...</Typography>
      </Box>
      {/* load background image component */}
      {image}
    </>
  );
}

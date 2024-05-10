import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { blueGrey } from "@mui/material/colors";
import { Children, useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";

const Delete = () => {
  const [X, setX] = useState("");
  const [Y, setY] = useState("");
  const currentValue = useRef(null);

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      // console.log(e);
      setX(e.x);
      setY(e.y);
    });

    console.log(currentValue);
    currentValue.current.focus();
    currentValue.current.devName = "macua";
  }, []);

  return (
    <Box>
      {" "}
      <Box textAlign={"center"}>
        <Typography variant="h6">Coordinate X {X}</Typography>
        <Typography variant="h6">Coordinate Y {Y}</Typography>
      </Box>
      <Box textAlign={"center"}>
        <TextField label={"find the name"} ref={currentValue} />
      </Box>
    </Box>
  );
};

export default Delete;

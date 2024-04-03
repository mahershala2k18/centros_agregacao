import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const SkeletonComponent = () => {
  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={100} />
      <Skeleton variant="rectangular" sx={{ fontSize: "1rem" }} width={150} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={200} />
      <Skeleton variant="rectangular" sx={{ fontSize: "1rem" }} width={100} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={100} />
      <Skeleton variant="rectangular" sx={{ fontSize: "1rem" }} width={150} />
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} width={200} />
      <Skeleton variant="rectangular" sx={{ fontSize: "1rem" }} width={100} />

      {/* For other variants, adjust the size with `width` and `height` */}
      {/* <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} /> */}
    </Stack>
  );
};

export default SkeletonComponent;

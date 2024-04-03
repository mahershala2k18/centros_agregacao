import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const handleProjectId = (e) => {
  const dataset = e.currentTarget.dataset;
  console.log(dataset);
};

export default function OdkProjects({ resolvedUrl }) {
  const { pathname } = useRouter();
  const [isMouseOver, setIsMouseOver] = useState(false);

  return (
    <Container sx={{ textAlign: "center" }}>
      <h1>Available Projects in Central</h1>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={16}>
          <Grid item xs={8}>
            <Link href={pathname + "/1/forms"}>
              {" "}
              <Item
                data-project-Id={1}
                data-project-name="interno"
                onClick={(e) => handleProjectId(e)}
              >
                {" "}
                <Typography
                  sx={{ fontSize: 25, color: "#3182bd" }}
                  gutterBottom
                >
                  Interno
                </Typography>
              </Item>
            </Link>
          </Grid>
          <Grid item xs={8}>
            <Link href={pathname + "/2/forms"}>
              {" "}
              <Item
                data-project-Id={2}
                data-project-name="sandbox"
                onClick={(e) => handleProjectId(e)}
              >
                {" "}
                <Typography
                  sx={{ fontSize: 25, color: "#3182bd" }}
                  gutterBottom
                >
                  Sandbox
                </Typography>
              </Item>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

// export async function getServerSideProps(context) {
//   const { query, resolvedUrl } = context;
//   console.log(query, resolvedUrl);
//   return { props: { resolvedUrl: resolvedUrl, query: query } };
// }

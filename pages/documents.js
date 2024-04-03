import React, { use } from "react";
import _ from "lodash";
import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import LinearIndeterminate from "../components/Loading";
import FailedToFetchDialog from "../components/DialogErrorOnFetch";
import ProjectsList from "../components/ProjectsList";
import DataGridDemo from "../components/TableDocuments";
import LoadingDocImage from "../components/LoadingDocImage";
import AppBarMenu from "../components/AppBarMenu";

export default function Docs({ data: session }) {
  const { user } = session;
  console.log(user);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    fetch(`https://survey.terrafirma.co.mz:446/v1/monitoring/docs`, {
      method: "GET",
    })
      .then((res) => {
        if (res.ok !== true) {
          console.log(res);
          throw new Error(`This is an HTTP error: The status is ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        setData([]);
        console.log(err);
      });
  }, []);

  if (user.role !== "admin")
    return (
      <>
        <AppBarMenu />
        <Container>
          <Typography variant="h5">
            Need more privilleges to view Content!
          </Typography>{" "}
        </Container>
      </>
    );
  if (loading) {
    return <LinearIndeterminate image={<LoadingDocImage />} />;
  }
  if (error) return <FailedToFetchDialog />;

  const documents = data.features;

  const handleClick = (e) => {
    const selectedProject = e.currentTarget.dataset.itemProjectName;
    console.log(selectedProject);
    setActiveItem(_.lowerCase(selectedProject));
  };

  const Title = () => {
    return (
      <Typography
        variant="h5"
        align="center"
        paragraph={true}
        sx={{
          marginTop: 2,
          fontWeight: "bold",
          fontFamily: "Rubik, sans-serif",
        }}
      >
        {activeItem === ""
          ? " Find here documentation related to all projects"
          : `${_.upperCase(activeItem)} DOCUMENTS`}
      </Typography>
    );
  };

  const MainBody = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <ProjectsList
            documents={documents}
            activeItem={activeItem}
            // total={total}
            handleClick={handleClick}
          />
        </Grid>
        <Grid item xs={8}>
          {activeItem !== "" ? (
            <DataGridDemo _documents={documents} _activeItem={activeItem} />
          ) : (
            <Container sx={{ textAlign: "center", marginTop: 10 }}>
              <img
                src="documents-symbol.png"
                alt="doc-img-icon"
                style={{ opacity: 0.5 }}
              />
            </Container>
          )}
        </Grid>
      </Grid>
    );
  };

  return (
    <>
      <AppBarMenu />
      <Container maxWidth="xl">
        <Title />
        <MainBody />
      </Container>
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: "/login" },
    };
  }

  //assign user role for anonymous login and visitors
  if (!session.user.role) {
    session.user.role = "user";
  }

  return {
    props: {
      data: session,
    },
  };
}

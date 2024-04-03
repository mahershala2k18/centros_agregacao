import Container from "@mui/material/Container";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FailedToFetchDialog from "../../../../components/DialogErrorOnFetch";
import { ListItemButton } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "50%",
}));

const OdkPage = ({ data, resolvedUrl }) => {
  const [dense, setDense] = useState(true);
  const [secondary, setSecondary] = useState(false);

  console.log("=>", resolvedUrl);
  const handleFormDetails = (e) => {
    const { formShortName, formFullName } = e.currentTarget.dataset;
    console.log(data[0]);
  };

  return (
    <Container>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Typography
          sx={{ mt: 4, mb: 2, fontWeight: "bold" }}
          variant="h4"
          component="div"
        >
          Formulários
        </Typography>
      </Box>

      <Box sx={{ width: "60%", margin: "auto" }}>
        {" "}
        {data.length ? (
          data.map(({ name, enketoId, xmlFormId, createdAt }) => (
            <ListItemButton
              id={enketoId}
              key={enketoId}
              data-form-short-name={xmlFormId} //[data-form-short-name] correct way to save data on htmlNode dataset
              data-form-full-name={name}
              onClick={(e) => handleFormDetails(e)}
              divider={true}
              sx={{ borderRadius: 2, mt: 1 }}
            >
              <ListItemIcon>
                <AssignmentIcon sx={{ color: "#238b45" }} />
              </ListItemIcon>
              <Link href={resolvedUrl + "/" + xmlFormId}>
                {" "}
                <ListItemText
                  primary={name}
                  secondary={secondary ? "Date created " + createdAt : null}
                />
              </Link>
            </ListItemButton>
          ))
        ) : (
          <FailedToFetchDialog serverMessage={data.message} />
        )}
      </Box>
    </Container>
  );
};

export default OdkPage;

// This gets called on every request
export async function getServerSideProps(context) {
  const {
    params: { projectID },
    resolvedUrl,
  } = context; // destructure the object {context}

  // Fetch data from external API
  const { data } = await axios
    .get(`http://cavateco.terrafirma.co.mz:3010/odk/${projectID}/forms`)
    .catch((err) => {
      const dataErr = {
        data: { err: `${JSON.stringify(err?.response?.status)}` },
      };
      return dataErr;
    });

  // Pass data to the page via props
  return { props: { data, resolvedUrl } };
}

import { useState, useEffect } from "react";
import { Avatar, List, ListItem } from "@mui/material";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import ListItemText from "@mui/material/ListItemText";
import _, { result } from "lodash";
import { useRouter } from "next/router";
import axios from "axios";
import FailedToFetchDialog from "../../../../../components/DialogErrorOnFetch";
import ListItemButton from "@mui/material/ListItemButton";
import GradingIcon from "@mui/icons-material/Grading";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Form = ({ data }) => {
  console.log("Gotten Data", data);

  // const { data: actualData, serverErr, currentPath } = data;
  // const { formDetails, approvedSubmissions } = actualData;
  // const [secondary, setSecondary] = useState(true);
  // const [isSelect, setIsSelect] = useState(false);
  // const [formData, setFormData] = useState(null);

  // useEffect(() => {
  //   fetch(`http://localhost:3010${currentPath}/submissions`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("==> ", data);
  //     });
  // }, []);

  // const handlelistItemButton = (e) => {
  //   setIsSelect(true);
  //   const formData = e.currentTarget.dataset;

  //   setFormData(formData);
  // };
  return (
    <Container>
      {/* {serverErr ? (
        <FailedToFetchDialog serverMessage={actualData.err} />
      ) : (
        <>
          <Box sx={{ textAlign: "center" }}>
            <h1>{formDetails.name}</h1>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid xs={4}>
                <Paper
                  elevation={3}
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    height: "auto",
                  }}
                >
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      height: 700,
                      bgcolor: "background.paper",
                      "& ul": { padding: 0 },
                      overflow: "auto",
                    }}
                  >
                    {approvedSubmissions.map(
                      (
                        {
                          instanceId,
                          submitter: { displayName },
                          createdAt,
                          attchments,
                          info,
                          reviewState,
                        },
                        index
                      ) => (
                        <ListItem id={index} key={index}>
                          {" "}
                          <ListItemButton
                            divider={true}
                            sx={{ borderRadius: 2 }}
                            onClick={(e) => handlelistItemButton(e)}
                            data-instance-id={instanceId}
                            data-attchments-url={attchments}
                            data-info-url={info}
                            data-submiter={displayName}
                            data-created-at={createdAt}
                          >
                            <Avatar sx={{ mr: 3 }}>
                              <GradingIcon color="info" />
                            </Avatar>
                            <ListItemText
                              primary={_.startCase(displayName)}
                              secondary={
                                secondary
                                  ? createdAt.split("T")[0] +
                                    " | " +
                                    createdAt.split("T")[1].split(".")[0]
                                  : null
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                      )
                    )}
                  </List>
                </Paper>
              </Grid>
              <Grid xs={8}>
                {isSelect && (
                  <>
                    <Item>
                      <h3>{_.startCase(formData.submiter)}</h3>{" "}
                      <h4>
                        {formData.createdAt.split("T")[0] +
                          " | " +
                          formData.createdAt.split("T")[1].split(".")[0]}
                      </h4>
                      <h4>
                        <a href={formData.infoUrl} target="_blank">
                          info
                        </a>
                      </h4>{" "}
                      <h4>
                        <a href={formData.attchmentsUrl} target="_blank">
                          Attached Document
                        </a>
                      </h4>{" "}
                      <img src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=164&h=164&fit=crop&auto=format" />{" "}
                      <img src="https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=164&h=164&fit=crop&auto=format" />
                    </Item>
                  </>
                )}
              </Grid>
            </Grid>
          </Box>
        </>
      )} */}
    </Container>
  );
};

export default Form;

export async function getServerSideProps(context) {
  const { resolvedUrl } = context;
  console.log(resolvedUrl);
  // Fetch data from external API
  const promise1 = () => {
    return axios.get(`http://cavateco.terrafirma.co.mz:3010${resolvedUrl}`);
  };

  const promise2 = () => {
    return axios.get(
      `http://cavateco.terrafirma.co.mz:3010${resolvedUrl}/submissions`
    );
  };

  const data = await Promise.all([promise1(), promise2()])
    .then((respose) => {
      return respose;
    })
    .catch((err) => {
      const dataErr = {
        data: { err: `${JSON.stringify(err?.response?.status)}` },
      };
      return dataErr;
    });

  const verifyData = () => {
    if (Array.isArray(data)) {
      //success block
      const [formDetails_Raw, submissions_Raw] = data;
      const { data: formDetails } = formDetails_Raw;
      const { data: submissions } = submissions_Raw;
      const approvedSubmissions = submissions
        .map((obj) => {
          return {
            ...obj,
            attchments:
              `http://cavateco.terrafirma.co.mz:3010${resolvedUrl}/submissions/` +
              obj.instanceId +
              "/attachments",
            info:
              `http://cavateco.terrafirma.co.mz:3010${resolvedUrl}/submissions/` +
              obj.instanceId +
              "/json",
          };
        })
        .filter(({ reviewState }) => {
          if (reviewState === "approved") {
            return true;
          }
        });
      // const promisses = approvedSubmissions.map(({ instanceId }, index) => {
      //   return axios.get(
      //     `http://localhost:3010${resolvedUrl}/submissions/${instanceId}/json`
      //   );
      // });
      // const getMoreInfoJson = async () => {
      //   const submissionsMetaInfo = await Promise.all(promisses)
      //     .then((response) => {
      //       console.log(response);
      //       return response;
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //       return dataErr;
      //     });
      //   return submissionsMetaInfo;
      // };
      // console.log("Aqui=>", getMoreInfoJson());
      if (formDetails.message) {
        // when there is no session available in odk central
        return { data: { err: formDetails.message }, serverErr: true };
      }
      return {
        data: { formDetails, approvedSubmissions },
        serverErr: false,
        currentPath: resolvedUrl,
      };
    } else {
      //when our backend server in offline
      return { ...data, serverErr: true };
    }
  };

  const delete1 = async () => {
    let myData;
    let resultados;
    if (verifyData().serverErr === false) {
      myData = await Promise.all(
        verifyData().data.approvedSubmissions.map(({ instanceId }) => {
          return axios.get(
            `http://cavateco.terrafirma.co.mz:3010${resolvedUrl}/submissions/` +
              instanceId +
              "/json"
          );
        })
      )
        .then((results) => {
          return results;
        })
        .catch((err) => {
          const dataErr = {
            data: { err: `${JSON.stringify(err?.response?.status)}` },
          };
          return dataErr;
        });

      resultados = myData.map((resultados) => {
        return {
          info1: resultados.data,
          info2: verifyData().data.approvedSubmissions,
        };
      });
    }

    return { data: resultados };
  };

  console.log(JSON.parse(JSON.stringify(delete1())));
  // Pass data to the page via props
  return { props: { data: "delete1()[0]" } };
}

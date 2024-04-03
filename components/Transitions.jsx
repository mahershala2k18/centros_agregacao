import * as React from "react";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import _ from "lodash";
import FormControlLabel from "@mui/material/FormControlLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import InfoIcon from "@mui/icons-material/Info";
import BasicPopover from "./Popover";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function SimpleGrow({ _documents, _activeItem }) {
  return (
    <List>
      {_documents
        .filter(({ project }) => {
          return _.lowerCase(project) === _.lowerCase(_activeItem);
        })
        .map(
          ({
            project,
            tec_name,
            assoc_name,
            authority,
            doc_type,
            url2,
            obs,
          }) => (
            <Grow in={true} timeout={1000} style={{ transformOrigin: "0 0 0" }}>
              <ListItem
                className={"document-item"}
                sx={{
                  width: "100%",
                  borderLeft: "1px solid green",
                  marginBottom: 1,
                  backgroundColor: "rgb(247,252,253)",
                }}
              >
                <Grid xs={8}>
                  {" "}
                  <Typography variant="caption">
                    Tipo de documento: <b>{doc_type}</b> <br />
                    Autoridade Emissora: <b>{authority}</b> <br />
                    Nome da Associação: <b>{assoc_name}</b> <br />
                    <Stack direction="row" spacing={1}>
                      <a href={url2} target="_blank">
                        {" "}
                        <Chip
                          label="Ver o documento"
                          variant="outlined"
                          icon={<InsertDriveFileIcon />}
                          clickable={true}
                          color="info"
                        />
                      </a>{" "}
                      {obs !== null ? (
                        <BasicPopover label="Observação" observacao={obs} />
                      ) : (
                        <Chip
                          label="Observação"
                          variant="outlined"
                          icon={<InfoIcon />}
                          clickable={true}
                          color="info"
                          disabled={true}
                        />
                      )}
                    </Stack>
                  </Typography>
                </Grid>
                <Grid xs={4}>
                  <Image
                    src={url2}
                    alt={doc_type.split(" ")[0] + "..."}
                    width={80}
                    height={70}
                    title={doc_type}
                    onLoad={() => console.log("loaded?")}
                  />
                </Grid>
              </ListItem>
            </Grow>
          )
        )
        .slice(0, 6)}
    </List>
  );
}

import React from "react";
import { useState, useEffect, useRef } from "react";
import { getSession } from "next-auth/react";
import { useSession } from "next-auth/react";
import Container from "@mui/material/Container";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "../components/Dialog";
import ListComponent from "../components/List";
import SkeletonComponent from "../components/Skeleton";
import Grid from "@mui/material/Grid";
import AppBarMenu from "../components/AppBarMenu";

const Encontros = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [arrayLanguages, setArrayLanguages] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [open, setOpen] = useState(false);
  const [savedLast, setSavedLast] = useState(null);

  useEffect(() => {
    //get all docs in DevDB at mongodb
    fetch("https://survey.terrafirma.co.mz:446/v1/mongo", {
      method: "Get",
      headers: {
        chave: "mahershala2k18",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setArrayLanguages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleInput = (e) => {
    setText(e.target.value);
  };

  const handleOnKeyDown = (e) => {
    setSavedLast(e.target.value);
    const _object = {
      name: e.target.value,
      rating: Math.round(Math.random() * 5),
      id: uuidv4(),
    };

    if (e.keyCode === 13) {
      setArrayLanguages((prev) => {
        return [
          ...prev,
          { name: _object.name, rating: _object.rating, id: _object.id },
        ];
      });
      //-----------------------------------------------
      //submit to db?
      fetch(
        `https://survey.terrafirma.co.mz:446/v1/mongo?name=${_object.name}&rating=${_object.rating}`,
        {
          method: "Post",
        }
      ).then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
      });

      setOpen(true);
      setText("");
    }
  };

  const handleSaveButton = () => {
    setSavedLast(text);
    const _object = {
      name: text,
      rating: Math.round(Math.random() * 5),
      id: uuidv4(),
    };

    setArrayLanguages((prev) => {
      return [
        ...prev,
        { name: _object.name, rating: _object.rating, id: _object.id },
      ];
    });

    //-----------------------------------------------
    //submit to db?
    fetch(
      `https://survey.terrafirma.co.mz:446/v1/mongo?name=${_object.name}&rating=${_object.rating}`,
      {
        method: "Post",
      }
    ).then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
    });

    setOpen(true);
    setText("");
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleDelete = (e) => {
    const itemName = e.currentTarget.dataset.itemName;
    // setDialogOpen(true);
    const newArray = arrayLanguages.filter(({ _id, name }) => {
      if (name !== itemName) return name;
    });

    setTimeout(() => {
      setArrayLanguages(newArray);
    }, 500);

    fetch(`https://survey.terrafirma.co.mz:446/v1/mongo/${itemName}`, {
      method: "Delete",
      headers: {
        chave: "mahershala2k18",
      },
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      console.log(response);
    });

    setIsDeleted(true);

    setTimeout(() => {
      setIsDeleted(false);
    }, 3000);
  };

  return (
    <>
      <AppBarMenu />
      <Container>
        <h1>Encontros e sensibilização</h1>

        <hr />
        <div>
          <Grid container>
            <Grid item xs={6}>
              <h3>Insert the items</h3>
              <br />
              <TextField
                id="input"
                type="text"
                label="languages"
                variant="outlined"
                size="small"
                value={text}
                onChange={(e) => handleInput(e)}
                onKeyDown={(e) => handleOnKeyDown(e)}
              />{" "}
              <Button
                variant="contained"
                size="large"
                onClick={() => handleSaveButton()}
              >
                <SaveIcon />
                &nbsp; save
              </Button>
              <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                className="success"
                // elevation={24}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  Successfuly saved <b>{savedLast}</b> !
                </Alert>
              </Snackbar>
              <br />
              <div className="mt-5">
                <b>Let's add here MUI components</b>
                <br />
                <>
                  <Dialog />
                </>
              </div>
            </Grid>
            <Grid item xs={6} className="text-start">
              <h3>Items list</h3>
              <br />
              {loading ? (
                <SkeletonComponent />
              ) : (
                <>
                  <ListComponent
                    _arr={arrayLanguages}
                    _handleDelete={handleDelete}
                  />
                </>
              )}
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Encontros;
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

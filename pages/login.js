import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { SiMailchimp } from "react-icons/si";
import LoginIcon from "@mui/icons-material/Login";
import Divider from "@mui/material/Divider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { getProviders, getSession, signIn } from "next-auth/react";
import AppBarMenu from "../components/AppBarMenu";

const Login = ({ providers }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="/">
          Mahershala's App
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const theme = createTheme();

  const handleEmail = (e) => {
    const _email = e.currentTarget.value;
    setEmail(_email);
  };
  const handlePassword = (e) => {
    const _pass = e.currentTarget.value;
    setPassword(_pass);
  };

  const handleSubmit = () => {
    signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: `/`,
    });
  };

  const handlePasswordKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <>
      <AppBarMenu />
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              padding: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // boxShadow:
              //   "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            }}
          >
            <Avatar src="/moz-flag.png" sx={{ width: 50, height: 50 }} />

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <>
                {" "}
                {providers &&
                  Object.values(providers).map((provider) => {
                    if (provider.name !== "Credentials") {
                      return (
                        <Button
                          variant="outlined"
                          key={provider.name}
                          sx={{
                            mb: 1,
                            width: "100%",
                            paddingLeft: 0,
                            textAlign: "left",
                          }}
                          onClick={() =>
                            signIn(provider.id, {
                              callbackUrl: "/map",
                            })
                          }
                        >
                          {provider.name === "GitHub" ? (
                            <GitHubIcon style={{ color: "black" }} />
                          ) : (
                            <img
                              loading="lazy"
                              height="24"
                              width="24"
                              id="provider-logo-dark"
                              src="https://authjs.dev/img/providers/google.svg"
                            />
                          )}
                          <span>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          </span>
                          Sign in with {provider.name}
                        </Button>
                      );
                    }
                  })}
              </>

              <>
                <Divider>
                  {" "}
                  <Typography
                    sx={{ fontSize: 14, color: "#737373" }}
                    align="center"
                  >
                    or login with
                  </Typography>
                </Divider>
              </>

              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => handleEmail(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => handlePassword(e)}
                onKeyPress={(e) => handlePasswordKeyPress(e)}
              />
              <FormControlLabel
                control={<Checkbox value="password" color="primary" />}
                label="Remember me"
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handleSubmit()}
              >
                Sign In Credentials
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};
export default Login;
export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  const providers = await getProviders();
  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }
  return {
    props: {
      providers,
    },
  };
}

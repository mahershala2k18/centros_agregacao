import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
const NotFound = () => {
  return (
    <>
      <Container sx={{ marginTop: "5%" }}>
        <Alert severity="warning">
          <AlertTitle sx={{ textAlign: "center" }}>
            <Typography variant="body1">
              A Página Que Procura Não Existe !!!
            </Typography>
          </AlertTitle>
        </Alert>
      </Container>
    </>
  );
};

export default NotFound;

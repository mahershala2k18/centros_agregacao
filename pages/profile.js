import Container from "@mui/material/Container";
import _ from "lodash";
import AppBarMenu from "../components/AppBarMenu";
import { getSession } from "next-auth/react";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

const Profile = ({ data }) => {
  const router = useRouter();
  //server-side gotten session
  const { email, name, image, role } = data.user;
  return (
    <>
      {" "}
      <AppBarMenu dev_name="tundro" />
      <Container maxWidth="xl" sx={{ textAlign: "center" }}>
        <h3>Hello {_.startCase(name)}</h3>
        <h5>You are logged in as {role}</h5>
        <h6>your email is {email}</h6>

        <Button onClick={() => router.push("/")}>return home</Button>
      </Container>
    </>
  );
};

export default Profile;

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

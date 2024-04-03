import { Container } from "@mui/system";
import AppBarMenu from "../components/AppBarMenu";
import { getSession } from "next-auth/react";
const lideres = ({ data: session }) => {
  const { user } = session;
  console.log(user);

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

  return (
    <>
      <AppBarMenu />
      <Container>
        <h1>Líderes page</h1>
      </Container>
    </>
  );
};

export default lideres;

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

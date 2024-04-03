import dynamic from "next/dynamic";
import _ from "lodash";
import AppBarMenu from "../components/AppBarMenu";
import { getSession } from "next-auth/react";
const MapWithNoSSR = dynamic(() => import("../components/MapComponent"), {
  ssr: false,
});
const Home = ({ data }) => {
  return (
    <>
      <div>
        <MapWithNoSSR />
      </div>
    </>
  );
};

export default Home;

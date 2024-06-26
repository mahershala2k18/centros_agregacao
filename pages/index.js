import dynamic from "next/dynamic";
import axios from "axios";
import _ from "lodash";

const MapWithNoSSR = dynamic(() => import("../components/MapComponent"), {
  ssr: false,
});
const Home = () => {
  return (
    <>
      <div>
        <MapWithNoSSR />
      </div>
    </>
  );
};

export default Home;
export async function getServerSideProps(context) {
  console.log("WHERE ARE WE...");

  const gs_layers = await axios({
    method: "get",
    url: "https://survey.terrafirma.co.mz:446/v1/geoserver/layers",
  });

  return {
    props: {
      data: null,
    },
  };
}

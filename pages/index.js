import dynamic from "next/dynamic";
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

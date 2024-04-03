import dynamic from "next/dynamic";
import AppBarMenu from "../components/AppBarMenu";
import { getSession } from "next-auth/react";
const MapWithNoSSR = dynamic(() => import("../components/MapComponent"), {
  ssr: false,
});

export default function Map({ data }) {
  console.log(data);
  return (
    <>
      <div>
        <MapWithNoSSR />
      </div>
    </>
  );
}

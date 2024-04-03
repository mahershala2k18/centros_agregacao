import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Icon, Point, LatLng, latLngBounds, latLng } from "leaflet";

import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Popup,
  WMSTileLayer,
  Tooltip,
  Pane,
  PolygonProps,
  useMapEvents,
  useMap,
  GeoJSON,
} from "react-leaflet";
import {
  Button,
  colors,
  Container,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Link from "next/link";
import RoomIcon from "@mui/icons-material/Room";
import FourKIcon from "@mui/icons-material/FourK";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TooltipMUi from "@mui/material/Tooltip";
import Grow from "@mui/material/Grow";
import { niassa_centros_zepa } from "../data/Centros_Zepa";
import { pontos_centros_zepa } from "../data/pontos_centros_zepa";

export default function Map() {
  const [showPins, setShowPins] = useState(true);
  const [showPolygons, setShowPolygons] = useState(true);
  const [curretPosition, setCurrentPosition] = useState(null);
  const [currentDetalis, setCurrentDetalis] = useState("");
  const [currentImg1, setCurrentImg1] = useState("");
  const [currentImg2, setCurrentImg2] = useState("");
  const [currentObj, setCurrentObj] = useState("");
  const handleShowPins = () => {
    setShowPins((prev) => !prev);
  };

  const handleShowPolygons = () => {
    setShowPolygons((prev) => !prev);
  };
  const handleDetails = () => {
    const format = currentDetalis.split(";");
    console.log(format);
    return format;
  };

  const handleSelectedArea = (e) => {
    console.log(e);
  };

  const handlePinClicks = (event) => {
    console.log(event);
    // setCurrentDetalis(el.properties.content_1);
    const new_current_content = event.target.options["data-desc"];
    const new_current_img = event.target.options.data_img_url;
    const new_current_img2 = event.target.options.data_img_url2;
    setCurrentDetalis(new_current_content);
    setCurrentImg1(new_current_img);
    setCurrentImg2(new_current_img2);
  };

  const getSplitedText = (text) => {
    const arr = text.split(";");
    return arr;
  };

  const MyMapEvents = (props) => {
    const map = useMapEvents({
      click: (e) => {
        console.log("currentObj", currentObj);
        // map.setView(e.latlng, map.getZoom(), {
        //   animate: true,
        // });

        map.eachLayer((layer) => {
          // if (layer.options.my_community) {
          //   layer.
          // }
        });
      },
      layeradd: () => {
        // map.eachLayer((layer) => {
        //   if (layer.options.my_community) {
        //     map.fitBounds([
        //       [layer._bounds._southWest.lat, layer._bounds._southWest.lng],
        //       [layer._bounds._northEast.lat, layer._bounds._northEast.lng],
        //     ]);
        //   }
        // });
      },
    });

    return null;
  };

  const MyMarkers = (props) => {
    const map = useMap();
    return props.pontos_centros_zepa.features.map((el, index) => (
      <Marker
        key={index}
        // position={[el.properties.y, el.properties.x]}
        position={el.geometry.coordinates}
        data-desc={el.properties.content_1}
        data_img_url={el.properties.url_1}
        data_img_url2={el.properties.url_2}
        draggable={false}
        eventHandlers={{
          click: () => {
            setCurrentPosition(el.geometry.coordinates);
            map.flyTo(el.geometry.coordinates, 16.5, { duration: 0.5 });
          },
          mouseover: (event) => handlePinClicks(event),
        }}
      ></Marker>
    ));
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          width: "40vw",
          minWidth: "300px",
          right: "0px",
          height: "100vh",
          overflow: "auto",
          borderLeft: `solid 1px ${colors.blueGrey[500]}`,
          zIndex: 99,
          background: "rgba(254,254,254, 1.0)",
        }}
      >
        <Container>
          {pontos_centros_zepa.features.map((obj, index) => (
            <Paper
              sx={{
                marginTop: 2,
                ":hover": {
                  boxShadow:
                    "rgba(222,45,38, 0.4) 0px 0px 0px 2px, rgba(222,45,38, 0.65) 0px 4px 6px -1px, rgba(222,45,38, 0.08) 0px 1px 0px inset;",
                },
              }}
              key={index + "centros"}
            >
              <Box textAlign={"center"} bgcolor={"GrayText"}>
                <Typography variant="h6" fontWeight={"bold"}>
                  {obj.properties.tident}
                </Typography>
              </Box>
              <Box
                data-current-obj={obj.properties}
                sx={{
                  border: `dashed 1px ${colors.blueGrey[300]}`,
                  mt: 1,
                  mb: 1,
                }}
                onMouseOver={() => setCurrentObj(obj.properties)}
              >
                {/* <ListItem>{obj.properties.content_1}</ListItem> */}
                <List>
                  {getSplitedText(obj.properties.content_1).map(
                    (line, index) => (
                      <ListItem key={index + "desc"}>
                        {_.startCase(line)}
                      </ListItem>
                    )
                  )}
                </List>
              </Box>
              <Box>
                <img src={obj.properties.url_1} width="609" height={"500"} />
              </Box>

              <Box
                sx={{
                  mt: 1,
                  mb: 1,
                }}
              >
                {" "}
                <img src={obj.properties.url_2} width="609" height={"500"} />
              </Box>
            </Paper>
          ))}
        </Container>
      </Box>

      <MapContainer
        id="map"
        center={[-18.294966647014329, 37.434490976069448]}
        zoom={6}
        scrollWheelZoom={true}
        // style={{ height: "calc(100vh - 0px)" }}
        zoomControl={true}
        style={{
          position: "absolute",
          left: 0,
          width: "60vw",
          height: "100vh",
          zIndex: 1,
        }}
      >
        <TileLayer
          attribut
          ion='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {showPins && <MyMarkers pontos_centros_zepa={pontos_centros_zepa} />}
        {showPolygons && (
          <GeoJSON
            data={niassa_centros_zepa.features}
            style={function (feature) {
              return { color: `${colors.deepPurple[800]}` };
            }}
            onEachFeature={(feature, layer) => {
              layer.bindTooltip(feature.properties.tident);
            }}
          />
        )}
        <MyMapEvents macua={"Macua De MOzambique"} />
      </MapContainer>
    </>
  );
}

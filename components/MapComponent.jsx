import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Icon, Point, LatLng, latLngBounds, latLng } from "leaflet";
import MiniMap from "leaflet-minimap";
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
import Divider from "@mui/material/Divider";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LayersIcon from "@mui/icons-material/Layers";
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
        // console.log("currentObj", currentObj);
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
            map.flyTo(el.geometry.coordinates, 16.5, { duration: 0.55 });
          },
          mouseover: (event) => handlePinClicks(event),
        }}
      ></Marker>
    ));
  };

  const FlyToFeature = ({ feature }) => {
    const map = useMap();

    if (feature !== "") {
      map.flyTo([feature.y, feature.x], 17);
    }

    return null;
  };

  // minimap ---atempt //

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
            <Box onMouseOver={() => setCurrentObj(obj.properties)}>
              <Paper
                sx={{
                  marginTop: 2,
                  borderLeft:
                    obj.properties.tident === currentObj.tident &&
                    `solid 3px ${colors.green[300]}`,
                  ":hover": {
                    // boxShadow:
                    //   "rgba(222,45,38, 0.4) 0px 0px 0px 2px, rgba(222,45,38, 0.65) 0px 4px 6px -1px, rgba(222,45,38, 0.08) 0px 1px 0px inset;",
                  },
                }}
                key={index + "centros"}
              >
                <Box
                  textAlign={"center"}
                  sx={{
                    backgroundColor:
                      obj.properties.tident === currentObj.tident
                        ? colors.green[900]
                        : colors.grey[300],
                    boxShadow:
                      obj.properties.tident === currentObj.tident &&
                      `rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px`,
                  }}
                >
                  <Typography variant="h6" fontWeight={"bold"}>
                    {obj.properties.tident}
                  </Typography>
                </Box>
                <Box
                  data-current-obj={obj.properties}
                  sx={{
                    mt: 1,
                    mb: 1,
                  }}
                  onMouseOver={() => setCurrentObj(obj.properties)}
                >
                  <Typography variant="body1" ml={3} fontWeight={"bold"}>
                    Description
                  </Typography>
                  {/* <ListItem>{obj.properties.content_1}</ListItem> */}
                  <ul>
                    {getSplitedText(obj.properties.content_1).map(
                      (line, index) => (
                        <li key={index + "desc"}>{_.startCase(line)}</li>
                      )
                    )}
                  </ul>
                </Box>
                <Divider variant="middle" />
                <Box>
                  <img src={obj.properties.url_1} width="609" height={"500"} />
                </Box>
                <Divider variant="middle" sx={{ mt: 2 }} />
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
            </Box>
          ))}
        </Container>
      </Box>

      <MapContainer
        id="map"
        center={[-18.294966647014329, 37.434490976069448]}
        zoom={6}
        scrollWheelZoom={true}
        // style={{ height: "calc(100vh - 0px)" }}
        zoomControl={false}
        style={{
          position: "absolute",
          left: 0,
          width: "60vw",
          height: "100vh",
          zIndex: 1,
        }}
      >
        {/* <IconButton
          aria-label="delete"
          className="leaflet-control"
          sx={{
            boxShadow: " rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
            backgroundColor: "white",
            ":hover": { backgroundColor: "beige" },
          }}
        >
          <LayersIcon color="warning" fontSize="large" />
        </IconButton>
        <IconButton
          aria-label="delete"
          className="leaflet-container leaflet-container leaflet-control-scale"
          sx={{
            zIndex: 2000,
            boxShadow: " rgba(0, 0, 0, 0.56) 0px 22px 70px 4px",
            backgroundColor: `${colors.grey[500]}`,
            ":hover": { backgroundColor: "beige" },
          }}
        >
          <LayersIcon color="warning" fontSize="large" />
        </IconButton> */}
        {/* <TileLayer
          attribut
          ion='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
        <TileLayer
          url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">Google Terrain</a> contributors'
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

        {/* <WMSTileLayer
          layers={"geonode:Distritos"}
          url="https://madico.terrafirma.co.mz/geoserver/geonode/wms"
          format="image/png"
          transparent={true}
          styles={"distritos_style_2"}
        /> */}
        <MyMapEvents macua={"Macua De MOzambique"} />
        <FlyToFeature feature={currentObj} />
      </MapContainer>
    </>
  );
}

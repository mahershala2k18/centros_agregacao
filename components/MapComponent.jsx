import { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import IconButton from "@mui/material/IconButton";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import HomeIcon from "@mui/icons-material/Home";
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
  SVGOverlay,
} from "react-leaflet";
import { colors } from "@mui/material/";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

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
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import ModalForImages from "./ModalForImages";
import {
  Link,
  Button,
  Element,
  Events,
  scroller,
  animateScroll as scroll,
  scrollSpy,
} from "react-scroll";

export default function Map() {
  const defaultMapProps = {
    center: [-18.294966647014329, 37.434490976069448],
    zoom: 6,
  };
  const [showPins, setShowPins] = useState(true);
  const [showPolygons, setShowPolygons] = useState(true);
  const [curretPosition, setCurrentPosition] = useState(null);
  const [currentDetalis, setCurrentDetalis] = useState("");
  const [currentImg1, setCurrentImg1] = useState("");
  const [currentImg2, setCurrentImg2] = useState("");
  const [currentObj, setCurrentObj] = useState("");
  const [currentBaseMap, setCurrentbase] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [imageForModal, setImageForModal] = useState("");
  const [imageForModal2, setImageForModal2] = useState("");
  const imgRef = useRef();
  const handleShowPins = () => {
    setShowPins((prev) => !prev);
  };

  const handleShowPolygons = () => {
    setShowPolygons((prev) => !prev);
  };
  const handleDetails = () => {
    const format = currentDetalis.split(";");
    return format;
  };

  const handleBaseMaps = () => {};

  const handlePinClicks = (event) => {
    // setCurrentDetalis(el.properties.content_1);
    const new_current_content = event.target.options["data-desc"];
    const new_current_img = event.target.options.data_img_url;
    const new_current_img2 = event.target.options.data_img_url2;
    setCurrentDetalis(new_current_content);
    setCurrentImg1(new_current_img);
    setCurrentImg2(new_current_img2);
  };

  const handleModalForImages = (imgUrl) => {
    console.log("image: ", imgUrl);
    imgRef.current = imgUrl;
    setOpenModal(true);
  };
  const getSplitedText = (text) => {
    const arr = text.split(";");
    return arr;
  };

  const MyMapEvents = (props) => {
    const map = useMapEvents({
      click: (e) => {
        // map.setView(e.latlng, map.getZoom(), {
        //   animate: true,
        // });
        // map.eachLayer((layer) => {
        //   if (
        //     layer.options.layer_name &&
        //     layer.options.layer_name === "pontos_areas_da_zepa"
        //   ) {
        //     console.log("Marker available", layer.options.marker_id);
        //   }
        // });
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

  const handleHomeButton = () => {
    mapInstance.setView(defaultMapProps.center, defaultMapProps.zoom);

    return null;
  };

  const Areas = () => {
    return (
      <GeoJSON
        data={niassa_centros_zepa.features}
        style={function (feature) {
          return { color: `${colors.deepPurple[800]}` };
        }}
        onEachFeature={(feature, layer) => {
          layer.bindTooltip(feature.properties.tident);

          if (feature.properties.tident === currentObj.tident) {
            layer.setStyle({
              color: `${colors.green["A700"]}`,
              fillOpacity: 0.1,
              weight: 3,
              dashArray: 2,
            });
          }

          layer.on({
            click: (e) => {
              console.log("e =>", e.target.feature.properties.tident);
              scroller.scrollTo(e.target.feature.properties.tident, {
                duration: 1500,
                delay: 100,
                smooth: true,
                containerId: e.target.feature.properties.tident,
                offset: 50,
              });
            },
            mouseover: (e) => {
              e.target.setStyle({
                color: `${colors.green["A700"]}`,
                fillOpacity: 0.1,
                weight: 6,
                dashArray: 2,
              });
            },
            mouseout: (e) => {
              e.target.setStyle({
                color: `${colors.green["A700"]}`,
                weight: 3,
              });
            },
          });
        }}
      />
    );
  };

  const MyMarkers = ({ pontos_centros_zepa }) => {
    return pontos_centros_zepa.features.map((el, index) => (
      <Marker
        key={index + "centros"}
        position={el.geometry.coordinates}
        data-desc={el.properties.content_1}
        data_img_url={el.properties.url_1}
        data_img_url2={el.properties.url_2}
        marker_id={el.properties.tident}
        layer_name={pontos_centros_zepa.name}
        loc_distrito={el.properties.Distrito}
        draggable={false}
        eventHandlers={{
          click: (e) => {
            setCurrentPosition(el.geometry.coordinates);
          },
        }}
      ></Marker>
    ));
  };

  const FlyToFeature = ({ feature }) => {
    console.log("feature", feature);
    setImageForModal(feature.url_1);
    setImageForModal2(feature.url_2);
    const map = useMap();

    if (feature !== "") {
      map.flyTo([feature.y, feature.x], 17);
    }

    return null;
  };

  // minimap ---atempt //
  return (
    <Grid display={"flex"} flexDirection={"row"} container>
      <Grid
        xs={12}
        md={5}
        lg={4}
        xl={4}
        sx={{
          overflowY: "auto",
          height: "100vh",
          background: "rgba(254,254,254, 1.0)",
        }}
      >
        <>
          <ModalForImages
            openModal={openModal}
            setOpenModal={setOpenModal}
            imageForModal={imageForModal}
            currentAttachmentUrl={imgRef.current}
          />
        </>
        <Container>
          {pontos_centros_zepa.features.map((obj, index) => (
            <Element
              name={obj.properties.tident}
              containerId={obj.properties.tident}
              element-name={obj.properties.tident}
              key={index + "scroll_element"}
              className="element"
            >
              <Paper
                sx={{
                  marginTop: 2,
                  borderRadius: 0,
                  borderLeft:
                    obj.properties.tident === currentObj.tident &&
                    `solid 3px ${colors.green["A400"]}`,
                  ":hover": {
                    // boxShadow:
                    //   "rgba(222,45,38, 0.4) 0px 0px 0px 2px, rgba(222,45,38, 0.65) 0px 4px 6px -1px, rgba(222,45,38, 0.08) 0px 1px 0px inset;",
                  },
                }}
                key={index + "centros"}
                onMouseOver={() => setCurrentObj(obj.properties)}
              >
                <Box
                  textAlign={"center"}
                  sx={{
                    backgroundColor:
                      obj.properties.tident === currentObj.tident
                        ? colors.green["A700"]
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
                <Box
                  display={"flex"}
                  justifyContent={"space-evenly"}
                  flexDirection={"row"}
                >
                  <Box
                    onClick={() => handleModalForImages(obj.properties.url_1)}
                  >
                    <img
                      src={obj.properties.url_1}
                      width="250"
                      height={"100"}
                      data-attachemnt-name="img1"
                    />
                  </Box>
                  <Box
                    onClick={() => handleModalForImages(obj.properties.url_2)}
                  >
                    <img
                      src={obj.properties.url_2}
                      width="250"
                      height={"100"}
                      data-attachemnt-name="img2"
                    />
                  </Box>
                </Box>
                <Divider variant="middle" sx={{ mt: 2 }} />
              </Paper>
            </Element>
          ))}
        </Container>
      </Grid>
      <Grid xs={12} md={7} lg={8} xl={8} padding={0}>
        <MapContainer
          id="map"
          center={defaultMapProps.center}
          zoom={defaultMapProps.zoom}
          scrollWheelZoom={true}
          devName="Mahershala Ali"
          // style={{ height: "calc(100vh - 0px)" }}
          zoomControl={false}
          style={{
            // position: "absolute",
            // left: 0,
            // width: "60vw",
            // width: "55%",
            height: "100vh",
            // zIndex: 1,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 20,
              left: 10,
              padding: 1,
              // backgroundColor: `${colors.red[500]}`,
              // background: "rgba(255,255,255,0.9)",
              borderRadius: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
            className="leaflet-control"
          >
            <IconButton
              aria-label="delete"
              sx={{
                display: "flex",
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
                background: "rgba(255,255,255)",
                ":hover": {
                  backgroundColor: colors.grey[200],
                },
                mb: 1,
              }}
              size="small"
            >
              <LayersIcon color="info" fontSize="medium" />
            </IconButton>
            <IconButton
              aria-label="set-default-view"
              sx={{
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
                background: "rgba(255,255,255)",
                ":hover": {
                  backgroundColor: colors.grey[200],
                },
                mb: 1,
              }}
              size="small"
              onClick={handleHomeButton}
            >
              <HomeIcon color="success" fontSize="medium" />
            </IconButton>
            <IconButton
              aria-label="delete"
              sx={{
                boxShadow:
                  "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;",
                background: "rgba(255,255,255)",
                ":hover": {
                  backgroundColor: colors.grey[200],
                },
              }}
              size="small"
            >
              <FullscreenIcon color="inherit" fontSize="medium" />
            </IconButton>
          </Box>
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
          {showPins && (
            <MyMarkers
              pontos_centros_zepa={pontos_centros_zepa}
              layer_name={"markers"}
            />
          )}
          {showPolygons && <Areas />}

          {/* <WMSTileLayer
            layers={"geonode:Distritos"}
            url="https://madico.terrafirma.co.mz/geoserver/geonode/wms"
            format="image/png"
            transparent={true}
            styles={"distritos_style_2"}
          /> */}
          <MyMapEvents macua={"Macua De MOzambique"} />
          <FlyToFeature feature={currentObj} />
          <handleHomeButton />
        </MapContainer>
      </Grid>
    </Grid>
  );
}

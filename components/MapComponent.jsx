import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import IconButton from "@mui/material/IconButton";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import HomeIcon from "@mui/icons-material/Home";
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
  ScaleControl,
  useMapEvents,
  useMap,
  GeoJSON,
  SVGOverlay,
} from "react-leaflet";
import { colors } from "@mui/material/";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import PerfectScrollbar from "react-perfect-scrollbar";
import Divider from "@mui/material/Divider";
import LayersIcon from "@mui/icons-material/Layers";
import { HeroPatters } from "../data/CSS_data";
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
  animateScroll,
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
  const [currentObj, setCurrentObj] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [imageForModal, setImageForModal] = useState("");
  const [imageForModal2, setImageForModal2] = useState("");
  const [basemapId, setBasemapId] = useState(1);
  const imgRef = useRef();

  const handleModalForImages = (imgUrl) => {
    console.log("image: ", imgUrl);
    imgRef.current = imgUrl;
    setOpenModal(true);
  };

  const getSplitedText = (text) => {
    const arr = text.split(";");
    return arr;
  };

  const handlePaperMouseOver = (currentObj) => {
    setCurrentObj(currentObj);
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

  const MapButtons = () => {
    const map = useMap();

    const handleHomeButton = () => {
      setCurrentObj(null);
      map.flyTo(defaultMapProps.center, defaultMapProps.zoom, {
        duration: 0.5,
      });
    };

    //MACUA DE MOZAMBUQIE MISTER AKAKAKAKAKAKAKA
    const handleLayersButton = () => {
      setBasemapId((prev) => {
        if (prev >= 3) {
          return 1;
        } else {
          return prev + 1;
        }
      });

      console.info("current basemap", basemapId);
    };

    return (
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
          onClick={handleLayersButton}
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
        {currentObj && (
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
        )}
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
    );
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

          if (currentObj && feature.properties.tident === currentObj.tident) {
            layer.setStyle({
              color: `${colors.green["A700"]}`,
              fillOpacity: 0.1,
              weight: 3,
              dashArray: 2,
            });
          }

          layer.on({
            click: (e) => {
              console.log("cicked polygon", e.target);
            },
            mouseover: (e) => {
              let featureName = e.target.feature.properties.tident;
              let selectedPaper = currentObj ? currentObj.tident : null;
              if (selectedPaper === featureName) {
                e.target.setStyle({
                  color: `${colors.green["A700"]}`,
                  fillOpacity: 0.1,
                  weight: 6,
                  dashArray: 2,
                });
              }
            },
            mouseout: (e) => {
              let featureName = e.target.feature.properties.tident;
              let selectedPaper = currentObj ? currentObj.tident : null;
              if (selectedPaper === featureName) {
                e.target.setStyle({
                  color: `${colors.green["A700"]}`,
                  weight: 3,
                });
              }
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
            console.log("e", e);
            setCurrentPosition(el.geometry.coordinates);
          },
        }}
      />
    ));
  };

  const FlyToListener = ({ feature }) => {
    const map = useMap();
    useEffect(() => {
      if (feature) {
        map.flyTo([feature.y, feature.x], 17);
      }
    }, [feature]);

    return null;
  };

  const FlyToFeature = ({ feature }) => {
    if (!feature) return null;
    console.log("flying to", feature);
    setImageForModal(feature.url_1);
    setImageForModal2(feature.url_2);
    const map = useMap();

    if (feature) {
      map.flyTo([feature.y, feature.x], 17);
    }

    return null;
  };

  const SwichBasemap = () => {
    const map = useMap();

    if (basemapId === 1)
      return (
        <TileLayer
          attribut
          ion='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      );

    if (basemapId === 2)
      return (
        <WMSTileLayer
          layers={"geonode:Distritos"}
          url="https://madico.terrafirma.co.mz/geoserver/geonode/wms"
          format="image/png"
          transparent={true}
          styles={"distritos_style_2"}
        />
      );

    if (basemapId === 3)
      return (
        <TileLayer
          url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">Google Terrain</a> contributors'
        />
      );
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
          ...HeroPatters[7],
          border: `solid 1px ${colors.grey[500]}`,
        }}
      >
        <PerfectScrollbar>
          <>
            <ModalForImages
              openModal={openModal}
              setOpenModal={setOpenModal}
              currentAttachmentUrl={imgRef.current}
            />
          </>
          <Container>
            {pontos_centros_zepa.features.map((obj, index) => (
              <Paper
                sx={{
                  marginTop: 2,
                  borderTopLeftRadius: 2,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  borderBottomLeftRadius: 0,

                  borderLeft:
                    currentObj &&
                    obj.properties.tident === currentObj.tident &&
                    `solid 3px ${colors.green["A400"]}`,
                }}
                key={index + "centros"}
                onMouseOver={() => handlePaperMouseOver(obj.properties)}
              >
                <Box
                  textAlign={"center"}
                  sx={{
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 0,

                    backgroundColor:
                      currentObj && obj.properties.tident === currentObj.tident
                        ? colors.green["A700"]
                        : colors.grey[300],
                    boxShadow:
                      currentObj &&
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
                <Grid display={"flex"} flexDirection={"row"}>
                  <Grid
                    xs={12}
                    md={12}
                    onClick={() => handleModalForImages(obj.properties.url_1)}
                  >
                    <img
                      src={obj.properties.url_1}
                      width="250"
                      height={"100"}
                      data-attachemnt-name="img1"
                    />
                  </Grid>
                  <Grid
                    xs={12}
                    md={12}
                    onClick={() => handleModalForImages(obj.properties.url_2)}
                  >
                    <img
                      src={obj.properties.url_2}
                      width="250"
                      height={"100"}
                      data-attachemnt-name="img2"
                    />
                  </Grid>
                </Grid>
                <Divider variant="middle" sx={{ mt: 2 }} />
              </Paper>
            ))}
          </Container>
        </PerfectScrollbar>
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
          <MapButtons dev_name={"macua-de-moz"} />
          <SwichBasemap />
          {/* <TileLayer
            attribut
            ion='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> */}
          {/* <TileLayer
            url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            maxZoom={20}
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">Google Terrain</a> contributors'
          /> */}
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
          <ScaleControl position={"bottomright"} />
        </MapContainer>
      </Grid>
    </Grid>
  );
}

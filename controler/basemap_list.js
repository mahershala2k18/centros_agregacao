const baseMapList = [
  {
    name: "openstreet",
    layer: () => {
      return (
        <TileLayer
          url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          maxZoom={20}
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">Google Terrain</a> contributors'
        />
      );
    },
  },
  {
    name: "googlemap",
    layer: (
      <WMSTileLayer
        layers={"geonode:Distritos"}
        url="https://madico.terrafirma.co.mz/geoserver/geonode/wms"
        format="image/png"
        transparent={true}
        styles={"distritos_style_2"}
      />
    ),
  },
];

export default baseMapList;

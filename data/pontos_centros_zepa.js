const pontos_centros_zepa = {
  type: "FeatureCollection",
  name: "pontos_areas_da_zepa",
  crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  features: [
    {
      type: "Feature",
      properties: {
        OBJECTID: 1,
        tident: "ZEPA LAGO",
        Shape_Leng: 0.00919816631,
        Shape_Area: 4.70217e-6,
        Distrito: "Bandeze",
        content_1: `Site selected and cleared by local entities;
        public consultation meeting carried out in all sites;
        DUAT acquisition/process submitted for provincial Governor 
        approval and issuance of Provisional DUAT;
        Pre-environment and social screening carried out  - Categorized C`,

        url_1: "/Zepa_Lago.png",
        url_2: "/Zepa_PlanoIndicativoDeOcupacaoDoEspaco.png",
        Area: null,
        x: 35.035753,
        y: -12.887728,
      },
      geometry: {
        type: "Point",
        coordinates: [35.035753142741186, -12.887727673282281],
      },
    },
    {
      type: "Feature",
      properties: {
        OBJECTID: 2,
        tident: "ZEPA MARRUPA",
        Shape_Leng: 0.00892463408,
        Shape_Area: 2.794e-6,
        Distrito: "Marrupa",
        content_1: `Site selected; 
        public consultation meeting carried out; 
        DUAT acquisition/process submitted for provincial Governor approval and issuance of Provisional DUAT;
        Pre-environment and social screening carried out  - Categorized C`,
        url_1: "/Zepa_Marrupa.png",
        url_2: "/Zepa_PlanoIndicativoDeOcupacaoDoEspaco.png",
        Area: null,
        x: 37.434491,
        y: -13.294967,
      },
      geometry: {
        type: "Point",
        coordinates: [37.434490976069448, -13.294966647014329],
      },
    },
    {
      type: "Feature",
      properties: {
        OBJECTID: 3,
        tident: "ZEPA MAUA",
        Shape_Leng: 0.00716768091,
        Shape_Area: 2.95825e-6,
        Distrito: "Maua",
        content_1: `Site selected and cleared by local entities;
        public consultation meeting carried out in all sites;
        DUAT acquisition/process submitted for provincial Governor 
        approval and issuance of Provisional DUAT;
        Pre-environment and social screening carried out  - Categorized C`,
        url_1: "/Zepa_Maua.png",
        url_2: "/Zepa_PlanoIndicativoDeOcupacaoDoEspaco.png",
        Area: null,
        x: 37.152915,
        y: -13.901837,
      },
      geometry: {
        type: "Point",
        coordinates: [37.15291463282734, -13.901836513000534],
      },
    },
    {
      type: "Feature",
      properties: {
        OBJECTID: 4,
        tident: "ZEPA MUEMBE",
        Shape_Leng: 0.01004602641,
        Shape_Area: 5.06058e-6,
        Distrito: "Muembe",
        content_1: `Site selected and cleared by local entities;
        public consultation meeting carried out in all sites;
        DUAT acquisition/process submitted for provincial Governor 
        approval and issuance of Provisional DUAT;
        Pre-environment and social screening carried out  - Categorized C`,
        url_1: "/Zepa_Muembe.png",
        url_2: "/Zepa_PlanoIndicativoDeOcupacaoDoEspaco.png",
        Area: null,
        x: 35.664303,
        y: -13.085077,
      },
      geometry: {
        type: "Point",
        coordinates: [35.664303043008047, -13.085076942735695],
      },
    },
    {
      type: "Feature",
      properties: {
        OBJECTID: 0,
        tident: "ZEPA NIPEPE",
        Shape_Leng: 0.0,
        Shape_Area: 0.0,
        Distrito: "Nipepe",
        content_1: `All sites selected and cleared by local entities; 
        All public consultation meeting carried out in all sites; 
        DUAT acquisition/process submitted for provincial Governor approval and issuance of Provisional DUAT;
        Pre-environment and social screening carried out  - Categorized C;
        `,
        url_1: "/Zepa_Nipepe.png",
        url_2: "/Zepa_PlanoIndicativoDeOcupacaoDoEspaco.png",
        Area: null,
        x: 37.861506,
        y: -14.064884,
      },
      geometry: {
        type: "Point",
        coordinates: [37.861505955796162, -14.064884239656461],
      },
    },
    {
      type: "Feature",
      properties: {
        OBJECTID: 0,
        tident: "MECANHELAS",
        Shape_Leng: 0.0,
        Shape_Area: 0.0,
        Distrito: "Mecanhelas",
        content_1: `Site selected and cleared by local entities;
        public consultation meeting carried out in all sites;
        DUAT acquisition/process submitted for provincial Governor 
        approval and issuance of Provisional DUAT;
        Pre-environment and social screening carried out  - Categorized C`,
        url_1: "/Zepa_Mecanhelas.png",
        url_2: "/Zepa_PlanoIndicativoDeOcupacaoDoEspaco.png",
        Area: null,
        x: 36.048126,
        y: -15.016737,
      },
      geometry: {
        type: "Point",
        coordinates: [36.048126430408033, -15.01673706273513],
      },
    },
    {
      type: "Feature",
      properties: {
        OBJECTID: 0,
        tident: "MANDIMBA",
        Shape_Leng: 0.0,
        Shape_Area: 0.0,
        Distrito: "Mandimba",
        content_1: `Site selected and cleared by local entities;
        public consultation meeting carried out in all sites;
        DUAT acquisition/process submitted for provincial Governor 
        approval and issuance of Provisional DUAT;
        Pre-environment and social screening carried out  - Categorized C`,
        url_1: "/mandimba.png",
        url_2: "/Zepa_PlanoIndicativoDeOcupacaoDoEspaco.png",
        Area: null,
        x: 35.47849,
        y: -14.1197,
      },
      geometry: {
        type: "Point",
        coordinates: [35.478489659399038, -14.119699979891594],
      },
    },
  ],
};

const new_features = pontos_centros_zepa.features.map((props) => {
  let reversed_coordinates = props.geometry.coordinates.reverse();

  return {
    ...props,
    geometry: {
      type: "Point",
      coordinates: reversed_coordinates,
    },
  };
});

pontos_centros_zepa.features = new_features;

export { pontos_centros_zepa };

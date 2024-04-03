const getProvincia = (key) => {
  const provinces = {
    P01: "Niassa",
    P02: "Cabo Delgado",
    P03: "Nampula",
    P04: "Zambezia",
    P05: "Tete",
    P06: "Manica",
    P07: "Sofala",
    P08: "Inhambane",
    P09: "Gaza",
    P10: "Maputo Provincia",
    P11: "Maputo Cidade",
    null: "Por mapear Provincia",
  };
  return provinces[key];
};

export default getProvincia;

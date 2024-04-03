import { useState } from "react";
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";
import axios from "axios";
import getProvincia from "../controler/divisao_administrativa";
import _ from "lodash";
import { Container, Box, Typography, colors } from "@mui/material";

const Formularios = ({ data }) => {
  console.log(data);
  const grouped = _.groupBy(data, "provincia");
  console.log("grouped =>" + grouped);
  const newData = data.map((element) => {
    return {
      ...element,
      Disponivel: element.total_disponivel,
      Indisponivel: element.total_em_falta,
    };
  });

  const newData2 = data.map((element) => {
    return {
      ...element,
      Disponivel: element.total_disponivel,
      Indisponivel: element.total_em_falta * -1,
    };
  });
  console.log(newData);

  const [title, setTitle] = useState("");
  const handleTitle = (event) => {
    const val = event.target.value;
    setTitle(val);
  };
  return (
    <Box>
      <div>
        <p>{title}</p>
        <label>input1</label>
        <input onChange={handleTitle} type="text" id="1"></input>
      </div>

      <Container>
        <Typography sx={{ textAlign: "center" }}>LineChart</Typography>
        <LineChart
          width={1000}
          height={300}
          data={newData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Line
            type="monotone"
            dataKey="Disponivel"
            stroke={colors.green[800]}
          />
          <Line
            type="monotone"
            dataKey="Indisponivel"
            stroke={colors.red[500]}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="community_name" />
          <YAxis />
          <Tooltip />
        </LineChart>

        <Typography sx={{ textAlign: "center" }}>BarChart</Typography>
        <BarChart
          width={1000}
          height={300}
          data={newData2}
          stackOffset="sign"
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <Bar
            dataKey="Disponivel"
            barSize={30}
            stackId="a"
            fill={colors.lightBlue[900]}
          />
          <Bar
            dataKey="Indisponivel"
            stackId="a"
            barSize={30}
            fill={colors.red[300]}
          />
          <ReferenceLine y={0} stroke="#000" />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="community_name" />
          <YAxis />
          <Tooltip />
          <Legend
            width={150}
            wrapperStyle={{
              top: 10,
              right: -150,
              backgroundColor: "#f5f5f5",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "40px",
            }}
          />
        </BarChart>
      </Container>
    </Box>
  );
};

export default Formularios;

export async function getStaticProps(context) {
  const madico_docs = await axios({
    url: "https://survey.terrafirma.co.mz:446/v1/geoportal?limit=4",
    // url: `https://odkmadico.terrafirma.co.mz:446/v1/geoportal`,
    // url: `http://localhost:3010/v1/geoportal?limit=20`,
    method: "Get",
  })
    .then((response) => {
      if (_.lowerCase(response.statusText) !== "ok")
        return { message: "Falha ao obter os dados!!", success: false };

      if (!response.data.success) {
        return { results: [], success: false };
      } else {
        const handleData = response.data.results.map((element) => {
          return { ...element, provincia: getProvincia(element.id_province) };
        });
        console.log({ results: handleData.length, success: true });
        return { results: handleData, success: true };
      }
    })
    .catch((err) => {
      return { err, success: false };
    });

  return {
    props: {
      data: madico_docs.success ? madico_docs.results : [],
    },
  };
}

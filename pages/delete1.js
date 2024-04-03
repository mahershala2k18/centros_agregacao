import { getSession } from "next-auth/react";
import { useState, useEffect, use } from "react";
import axios from "axios";
import {
  Button,
  Box,
  Container,
  Divider,
  Chip,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";

import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRef } from "react";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";

const TestComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, page_size: 5 });

  const { page, page_size } = pagination;
  useEffect(() => {
    axios({
      url: ` https://survey.terrafirma.co.mz:446/v1/madico/pagination?page=${page}&page_size=${page_size}`,
      method: "GET",
    })
      .then(({ data }) => {
        const { data: currentData, meta = {} } = data;
        setData(currentData);
        setLoading(false);
      })
      .catch((err) => {
        setData([]);
        setLoading(false);
      });
  }, [pagination, page_size]);

  const handleClickNext = () => {
    // const { data: currentData, meta = {} } = data;

    console.log(data);
    setPagination((prev) => {
      return { ...prev, page: page + 1 };
    });
  };

  const handleClickPrevious = () => {
    console.log(data);
    setPagination((prev) => {
      return { ...prev, page: page > 1 ? page - 1 : 1 };
    });
  };

  const handleChange = (event) => {
    setPagination((prev) => {
      return { ...prev, page_size: event.target.value };
    });
  };

  const scrolToRef = useRef();

  const handleScroll = (e) => {
    const element = e.currentTarget.dataset.btn;
    scrolToRef.current.scrollIntoView();
  };

  return (
    <Container>
      <Box
        id="1"
        ref={scrolToRef}
        style={{ position: "fixed", textAlign: "center", right: 0 }}
      >
        <Paper>
          <Link to="6" spy={true} smooth={true} offset={50} duration={1000}>
            {" "}
            <Button data-btn="1" size="small">
              div1
            </Button>
          </Link>

          <Button data-btn="2" onClick={(e) => handleScroll(e)} size="small">
            div2
          </Button>
          <Button data-btn="3" onClick={(e) => handleScroll(e)} size="small">
            div3
          </Button>
          <Button data-btn="4" onClick={(e) => handleScroll(e)} size="small">
            div4
          </Button>
          <Button data-btn="5" onClick={(e) => handleScroll(e)} size="small">
            div5
          </Button>
          <Button data-btn="6" onClick={() => scrollTo(0, 0)} size="small">
            div6
          </Button>
        </Paper>
      </Box>

      {loading ? (
        <Box>Loading... </Box>
      ) : (
        <Box flexDirection={"row"} textAlign={"center"} mt={3}>
          {data.map(
            (
              {
                community_name,
                data_origin,
                docs_link,
                name_district,
                name_post,
              },
              index
            ) => (
              <Paper flexDirection={"row"} sx={{ width: 300 }} key={index}>
                <Typography variant="inherit">
                  {index + 1}- {community_name}
                </Typography>
                {/* <Box>
                  <Link href={docs_link}>{docs_link}</Link>
                </Box>
                <Box>{name_district}</Box> */}
              </Paper>
            )
          )}
          <Button onClick={handleClickPrevious}>previous</Button>
          <Button onClick={handleClickNext}>next</Button>
          <Chip label={"Page " + pagination.page} />
          <FormControl sx={{ width: "auto" }}>
            <InputLabel id="demo-simple-select-label">Rows</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={page_size}
              label="Rows"
              onChange={handleChange}
            >
              <MenuItem value={5}>5</MenuItem>{" "}
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}

      <Box id="2">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={true}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
          </SwiperSlide>
        </Swiper>
      </Box>
      <Box id="3">
        <Typography variant="h5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
          molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
          officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
          nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque
          error repudiandae fuga? Ipsa laudantium molestias eos{" "}
        </Typography>
      </Box>
      <>
        <Divider sx={{ mt: 2, mb: 2 }} />
      </>
      <Box id="4">
        {" "}
        <Typography variant="body2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
          molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
          officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
          nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque
          error repudiandae fuga? Ipsa laudantium molestias eos{" "}
        </Typography>
      </Box>
      <>
        <Divider sx={{ mt: 2, mb: 2 }} />
      </>
      <Box id="5" ref={scrolToRef}>
        <Typography variant="h5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
          mollitia, molestiae quas vel sint commodi repudiandae consequuntur
          voluptatum laborum numquam blanditiis harum quisquam eius sed odit
          fugiat iusto fuga praesentium optio, eaque rerum! Provident similique
          accusantium nemo autem. Veritatis obcaecati tenetur iure eius earum ut
          molestias architecto voluptate aliquam nihil, eveniet aliquid culpa
          officia aut! Impedit sit sunt quaerat, odit, tenetur error, harum
          nesciunt ipsum debitis quas aliquid. Reprehenderit, quia. Quo neque
          error repudiandae fuga? Ipsa laudantium molestias eos{" "}
        </Typography>
      </Box>
      <>
        <Divider sx={{ mt: 2, mb: 2 }} />
      </>

      <Box>
        <Alert>
          <AlertTitle>macua de mozmabique</AlertTitle>
        </Alert>
      </Box>
      <>
        <Divider sx={{ mt: 2, mb: 2 }} />
      </>
      <Box id="6" name="6" sx={{ textAlign: "center" }}>
        <img src="http://cavateco.terrafirma.co.mz:8090/geoserver/cavateco_madal_2/wms?service=WMS&version=1.1.0&request=GetMap&layers=cavateco_madal_2%3Apovoados&bbox=36.95234298706055%2C-17.953569412231445%2C37.11957931518555%2C-17.80048370361328&width=768&height=703&srs=EPSG%3A4326&styles=&format=image%2Fpng" />
      </Box>
    </Container>
  );
};

export default TestComponent;

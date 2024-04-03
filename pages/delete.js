import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Box from "@mui/material/Box";
const Example = () => {
  const images = [
    "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "https://odkmadico.terrafirma.co.mz:444/data/madico_images/img_descriptive_mem/mem_4a9c8c61-e4ff-4fc2-b45e-8adcb4459af1.jpg",
    "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
  ];

  return (
    <Slide>
      {images.map((href, index) => (
        <Box
          key={index}
          className="each-slide-effect"
          sx={{
            backgroundImage: `url(${href})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundSize: "cover",
            height: "650px",
          }}
        >
          {/* <Box
            component="span"
            sx={{
              padding: "20px",
              fontSize: "20px",
              background: "#efefef",
              textAlign: "center",
            }}
          >
            {index + 1}
          </Box> */}
        </Box>
      ))}
    </Slide>
  );
};

export default Example;

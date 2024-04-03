import React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import data from "../data/data";
import LeftArrow from "@mui/icons-material/ArrowBack";
import RightArrow from "@mui/icons-material/ArrowForward";
import AppBarMenu from "../components/AppBarMenu";
import { getSession } from "next-auth/react";

const About = () => {
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  // useEffect(() => {
  //   let slider = setInterval(() => {
  //     setIndex(index + 1);
  //   }, 5000);
  //   return () => {
  //     clearInterval(slider);
  //   };
  // }, [index]);

  const { id, image, name, title, quote } = people[0];

  return (
    <>
      <AppBarMenu />
      <Container>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {/* <div className="title">
          <h2>
            <span>/</span> About... Page create by Mahershala Ali
          </h2>
        </div> */}
          <div className="section-center">
            {people.map((person, personIndex) => {
              const { id, image, name, title, quote } = person;

              let position = "nextSlide";
              if (personIndex === index) {
                position = "activeSlide";
              }
              if (
                personIndex === index - 1 ||
                (index === 0 && personIndex === people.length - 1)
              ) {
                position = "lastSlide";
              }

              return (
                <article className={position} key={id}>
                  <img src={image} alt={name} className="person-img" />
                  <h4>{name}</h4>
                  <p className="title">{title}</p>
                  <p
                    className="text"
                    dangerouslySetInnerHTML={{ __html: quote }}
                  />
                  {/* <FaQuoteRight className="icon" /> */}
                </article>
              );
            })}
            {/* 
          <LeftArrow className="prev" onClick={() => setIndex(index - 1)} />

          <RightArrow className="next" onClick={() => setIndex(index + 1)} /> */}
          </div>
        </Typography>
      </Container>
    </>
  );
};

export default About;

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: { destination: "/login" },
    };
  }

  //assign user role for anonymous login and visitors
  if (!session.user.role) {
    session.user.role = "user";
  }

  return {
    props: {
      data: session,
    },
  };
}

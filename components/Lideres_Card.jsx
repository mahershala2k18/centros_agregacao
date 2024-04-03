import React from "react";
import "../Card.css";

const Card = (props) => {
  return (
    <div className="card mb-5 ">
      <img
        src={
          props._project.startsWith("oram") ||
          props._project.startsWith("NITIDAE")
            ? props._raw_img_url
            : props.img_url
        }
        className="card-img-top border"
        alt="chief_foto"
        height={300}
      />
      <div className="card-body ">
        <h6 className="card-title ">{props._name}</h6>
        <p className="card-text">
          Comunidade:{" "}
          <b className="border-bottom" style={{ color: "#4292c6" }}>
            {props._village_name}
          </b>
          <br />
          Categoria Líder:{" "}
          <b>
            <span className="border-bottom" style={{ color: "#4292c6" }}>
              {props._chief_level}
            </span>
          </b>
          . <br />
          {props._language
            ? `Línguas Faladas: ${props._language}, português.`
            : "Língua Falada: portugês"}{" "}
          <br />
          Total Famílias Residentes:{" "}
          <b className="border-bottom" style={{ color: "#4292c6" }}>
            {new Intl.NumberFormat("en-IN", {
              maximumSignificantDigits: 3,
            }).format(props._total_familias)}{" "}
          </b>
        </p>
        <hr />
        <p className="fst-italic text-muted">
          Evento ocorrido no âmbito do registo de terras do projecto{" "}
          <span className="border-bottom" style={{ color: "#4292c6" }}>
            {" "}
            {props._project}
          </span>{" "}
          na província de{" "}
          <span className="border-bottom" style={{ color: "#4292c6" }}>
            <b>{props._provincia}</b>
          </span>
        </p>{" "}
      </div>
    </div>
  );
};

export default Card;
// As línguas mais faladas na comunidade são o  <b className="fst-italic">{props._language} </b>

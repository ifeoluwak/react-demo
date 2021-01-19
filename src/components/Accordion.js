import React from "react";
import Form from "./Form";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";

import PlanetDetails from "./PlanetDetails";
import MobilePlanetRow from "./MobilePlanetDetails";

const Accordion = ({ title, expand, onClick, movieId, planets, type }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const ContentView =
    type === "table"
      ? isTabletOrMobile
        ? MobilePlanetRow
        : PlanetDetails
      : Form;

  return (
    <div style={{ marginTop: 20 }}>
      <div className={expand ? "title is-expanded" : "title"} onClick={onClick}>
        {title}
      </div>
      <div className={expand ? "content is-expanded" : "content"}>
        {expand ? <ContentView planets={planets} movieId={movieId} /> : <div />}
      </div>
    </div>
  );
};

Accordion.PropTypes = {
  title: PropTypes.string.isRequired,
  expand: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  movieId: PropTypes.number,
  planets: PropTypes.array,
  type: PropTypes.string.isRequired,
};

export default Accordion;

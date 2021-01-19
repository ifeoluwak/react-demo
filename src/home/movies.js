import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import Accordion from "../components/Accordion";

export const MovieList = (props) => {
  const [accordionKeys, setAccordionKeys] = useState({});
  const [initial, setInitial] = useState({});

  useEffect(() => {
    const keys = props?.movies?.reduce(
      (prev, curr) => ({ ...prev, [curr.episode_id]: false }),
      {}
    );
    setAccordionKeys(keys);
    setInitial(keys);
  }, [props]);

  const toggle = (index) => () => {
    setAccordionKeys({ ...initial, [index]: !accordionKeys[index] });
  };

  return (
    <div className="container">
      <dl className="accordion">
        {props?.movies?.map((item) => (
          <Accordion
            key={item.episode_id}
            movieId={item.episode_id}
            planets={item.planets}
            title={item.title}
            onClick={toggle(item.episode_id)}
            expand={accordionKeys[item.episode_id]}
            type="table"
          />
        ))}
      </dl>
    </div>
  );
};

MovieList.PropTypes = {
  movies: PropTypes.array,
};

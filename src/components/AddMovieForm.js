import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Accordion from "./Accordion";

const AddMovieForm = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="divider"></div>
      <dl className="accordion">
        <Accordion
          title="Add movie"
          onClick={() => setOpen(!open)}
          expand={open}
          type="form"
        />
      </dl>
    </>
  );
};

export default AddMovieForm;

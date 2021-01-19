import { uniqBy } from "lodash";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Delete from "../images/delete.svg";
import Search from "../images/search.svg";

const Form = (props) => {
  const [selectedPlanets, setSelectedPlanets] = useState([]);
  const [term, setTerm] = useState("");
  const [movieName, setMovieName] = useState("");
  const [error, setError] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    if (term) {
      search();
    } else if (planets) setPlanets([]);
  }, [term]);

  const handleAddMovie = (text) => {
    if (!text) {
      setError([]);
      setMovieName(text);
      return;
    }
    const isSmallLetter = /^[a-z]/.test(text);
    const has3chars = text.length > 2;
    let err = [];
    if (isSmallLetter)
      err.push("Movie title name must start with a capital letter.");
    if (!has3chars) err.push("Movie title name must be atleast 3 characters");
    setMovieName(text);
    setError(err);
  };

  const search = async () => {
    try {
      const response = await fetch(
        `https://swapi.dev/api/planets/?search=${term}`
      );
      const data = await response.json();
      setPlanets(data.results);
    } catch (error) {}
  };

  const handleSelect = (planet) => {
    const newData = uniqBy([...selectedPlanets, planet], "name");
    setSelectedPlanets(newData);
  };

  const handleRemove = (planet) => {
    const filtered = selectedPlanets.filter((i) => i.name !== planet.name);
    setSelectedPlanets(filtered);
  };

  const handleSubmit = async () => {
    const episode_id = Date.now();
    const newMovie = {
      title: movieName,
      planets: [],
      episode_id,
      created: episode_id,
    };
    const newPlanets = {
      movieId: episode_id,
      planets: selectedPlanets,
    };

    await Promise.all([
      props.savePlanets(newPlanets),
      props.saveMovies({ movie: newMovie }),
    ]);

    setSelectedPlanets([]);
    setTerm("");
    setMovieName("");
    setError([]);
    setPlanets([]);
  };

  const disabled = error.length || !selectedPlanets.length || !movieName;

  return (
    <div className="form">
      <div className="form_row">
        <p className={error.length ? "error" : ""}>Movie title</p>
        <input
          placeholder="Please enter the title of the movie"
          value={movieName}
          onChange={(e) => handleAddMovie(e.target.value)}
        />
        {error.length ? (
          <div className="errorDiv">
            {error.map((err, idx) => (
              <div key={idx}>
                <span>{err}</span>
                <br />
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <div>
        {selectedPlanets.map((sel) => (
          <div key={sel.name} className="selectedPlanet">
            {sel.name}
            <span onClick={() => handleRemove(sel)}>
              <img src={Delete} />
            </span>
          </div>
        ))}
      </div>
      <div className="form_row">
        <p>Add Planet</p>
        <div className="search_input">
          <input
            placeholder="Search for the the planet in database"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <img src={Search} className="search_icon" />
        </div>
        {planets.length ? (
          <div className="searchResultsBox">
            {planets.map((plnts, idx) => (
              <p key={idx} onClick={() => handleSelect(plnts)}>
                {plnts.name}
              </p>
            ))}
          </div>
        ) : null}
      </div>
      <div className="addMovie">
        <button onClick={handleSubmit} disabled={disabled}>
          Add Movie
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = ({
  planet: { savePlanets },
  movies: { saveMovies },
}) => ({
  savePlanets: (data) => savePlanets(data),
  saveMovies: (data) => saveMovies(data),
});

Form.PropTypes = {
  saveMovies: PropTypes.func.isRequired,
  savePlanets: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Form);

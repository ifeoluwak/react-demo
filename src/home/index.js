import React, { useEffect } from "react";
import { connect } from "react-redux";
import Lottie from "lottie-react";
import PropTypes from "prop-types";

import { Application } from "../movies";
import LoadingPulse from "../images/loading.json";
import Logo from "../images/logo.svg";
import AddMovieForm from "../components/AddMovieForm";

const Home = ({ movies, loading, getMovies }) => {
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <img src={Logo} style={{ marginBottom: 30, marginTop: 30 }} />
      {loading && !movies?.length ? (
        <div
          style={{
            height: 300,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie
            animationData={LoadingPulse}
            style={{ width: 200, height: 200 }}
          />
        </div>
      ) : (
        <Application movies={movies} />
      )}
      <AddMovieForm />
    </div>
  );
};

const mapStateToProps = ({ movies, loading }) => ({
  movies: movies.data,
  loading: loading.effects.movies?.getMovies,
});

const mapDispatchToProps = ({ movies: { getMovies } }) => ({
  getMovies: (data) => getMovies(data),
});

Home.PropTypes = {
  movies: PropTypes.array,
  loading: PropTypes.bool,
  getMovies: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

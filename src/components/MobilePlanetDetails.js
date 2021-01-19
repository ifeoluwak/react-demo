import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Lottie from "lottie-react";

import LoadingPulse from "../images/loading.json";

const Row = ({ title, val }) => {
  return (
    <div className={"row-item"}>
      <p>{title}</p>
      <p>{val}</p>
    </div>
  );
};

function MobilePlanetDetails({
  planets = [],
  movieId,
  getPlanets,
  loading,
  data,
}) {
  useEffect(() => {
    getPlanets({ planets, movieId });
  }, [planets]);

  const planetData = data?.[movieId] || [];

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Lottie
          animationData={LoadingPulse}
          style={{ width: 150, height: 150 }}
        />
      </div>
    );
  }

  return (
    <div className="mobile_details">
      {planetData.map((pl) => (
        <div key={pl.name}>
          <Row title="Planet Name" val={pl.name}></Row>
          <Row title="Rotation period" val={pl.rotation_period}></Row>
          <Row title="Orbital period" val={pl.orbital_period}></Row>
          <Row title="Diameter" val={pl.diameter}></Row>
          <Row title="Climate" val={pl.climate}></Row>
          <Row title="Surface water" val={pl.surface_water}></Row>
          <Row title="Population" val={pl.population}></Row>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = ({ loading, planet }) => ({
  loading: loading.effects.planet.getPlanets,
  data: planet.data,
});

const mapDispatchToProps = ({ planet: { getPlanets } }) => ({
  getPlanets: (data) => getPlanets(data),
});

MobilePlanetDetails.PropTypes = {
  planets: PropTypes.array,
  movieId: PropTypes.number,
  getPlanets: PropTypes.func,
  loading: PropTypes.bool,
  data: PropTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MobilePlanetDetails);

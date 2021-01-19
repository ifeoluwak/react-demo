import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Lottie from "lottie-react";
import { orderBy } from "lodash";
import PropTypes from "prop-types";

import TableRow from "./TableRow";
import LoadingPulse from "../images/loading.json";

const PlanetDetails = ({
  planets = [],
  movieId,
  getPlanets,
  loading,
  data,
}) => {
  const [sortedState, setSortedState] = useState({
    type: "",
    key: "",
  });

  useEffect(() => {
    getPlanets({ planets, movieId });
  }, [planets]);

  const SortView = ({ id }) => {
    const { type, key } = sortedState;
    return (
      <>
        <span
          className={
            type === "asc" && key === id ? "sorted-up sort-up" : "sort-up"
          }
          onClick={() => setSortedState({ type: "asc", key: id })}
        ></span>
        <span
          className={
            type === "desc" && key === id
              ? "sorted-down sort-down"
              : "sort-down"
          }
          onClick={() => setSortedState({ type: "desc", key: id })}
        ></span>
      </>
    );
  };

  const planetData = data?.[movieId] || [];
  const sortedData = orderBy(planetData, [sortedState.key], [sortedState.type]);

  return (
    <div style={{ minHeight: 244, width: "100%" }}>
      <table style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th>
              Planet Name
              <SortView id="name" />
            </th>
            <th>
              Rotation period <SortView id="rotation_period" />
            </th>
            <th>
              Orbital period <SortView id="orbital_period" />
            </th>
            <th>
              Diameter <SortView id="diameter" />
            </th>
            <th>
              Climate <SortView id="climate" />
            </th>
            <th>
              Surface water <SortView id="surface_water" />
            </th>
            <th>
              Population <SortView id="population" />
            </th>
          </tr>
        </thead>
        {!loading
          ? sortedData.map((p) => <TableRow planet={p} key={p.name} />)
          : null}
      </table>
      {loading ? (
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
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ loading, planet }) => ({
  loading: loading.effects.planet.getPlanets,
  data: planet.data,
});

const mapDispatchToProps = ({ planet: { getPlanets } }) => ({
  getPlanets: (data) => getPlanets(data),
});

PlanetDetails.PropTypes = {
  planets: PropTypes.array,
  movieId: PropTypes.number,
  getPlanets: PropTypes.func,
  loading: PropTypes.bool,
  data: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlanetDetails);

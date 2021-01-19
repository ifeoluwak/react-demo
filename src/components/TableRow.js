import React from "react";
import PropTypes from "prop-types";

function TableRow({ planet }) {
  return (
    <tbody>
      <tr>
        <td>{planet.name}</td>
        <td>{planet.rotation_period}</td>
        <td>{planet.orbital_period}</td>
        <td>{planet.diameter}</td>
        <td>{planet.climate}</td>
        <td>{planet.surface_water}</td>
        <td>{planet.population}</td>
      </tr>
    </tbody>
  );
}

TableRow.PropTypes = {
  planet: PropTypes.object,
};

export default TableRow;

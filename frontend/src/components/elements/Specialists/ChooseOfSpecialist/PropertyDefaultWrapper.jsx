import PropTypes from "prop-types";
import React from "react";
import { useReducer } from "react";
import "./PropertyDefaultWrapper.css";

export const PropertyDefaultWrapper = ({ property1, className }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "default",
  });

  return (
    <div
      className={`property-default-wrapper ${state.property1} ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      <div className="text-wrapper">Обрати спеціаліста</div>
    </div>
  );
};

function reducer(state, action) {
  if (state.property1 === "default") {
    switch (action) {
      case "click":
        return {
          property1: "variant-2",
        };
    }
  }

  if (state.property1 === "variant-2") {
    switch (action) {
      case "click":
        return {
          property1: "default",
        };
    }
  }

  return state;
}

PropertyDefaultWrapper.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "default"]),
};
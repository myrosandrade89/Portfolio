import React from "react";
import PropTypes from "prop-types";

interface IProgressBar {
  value: any;
  max: number;
}

export const ProgressBar = (props: IProgressBar) => {
  return <progress value={props.value} max={props.max} />;
};

ProgressBar.propType = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number,
};

ProgressBar.defaultProps = {
  max: 100,
};

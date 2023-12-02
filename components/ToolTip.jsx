"use client";
import { Tooltip } from "react-tooltip";
import clsx from "clsx";

const ToolTip = ({ id, className, ...restProps }) => {
  return <Tooltip id={id} className="tooltip-element" {...restProps} />;
};
export default ToolTip;

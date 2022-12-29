import * as React from "react";
import type { SVGProps } from "react";

const SvgDashboardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2zm0 8a1.994 1.994 0 0 1-1-3.723V4a1 1 0 0 1 2 0v2.277A1.993 1.993 0 0 1 8 10z"
      fillRule="evenodd"
    />
  </svg>
);

export default SvgDashboardIcon;

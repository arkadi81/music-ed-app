//  reactSVG.jsx

// Wrapper for a react SVG using refs - from https://koenvangilst.nl/blog/react-hooks-with-canvas

// to serve as SVG output for vexflow

// can be passed any "canvas manipulation / drawing function and will render / keep updated as state changes"

// Usage:
// props = {
//    renderer: function - the vexflow rendering function (or any other type of canvas-manipulating function) - passed without parameters to the component, but the function should be able to accept a target canvas
//    data: optional - the data to be rendeed (processed by the rednderer function)
// }
import React from "react";
// import "../../css/reactCanvas.css";

const ReactSVG = (props) => {
  const svgRef = React.useRef(null);

  React.useEffect(() => {
    const svg = svgRef.current;

    // clear the canvas before refresh
    // const context = svg.getContext("2d");
    // context.clearRect(0, 0, svg.width, svg.height);
    svg.innerHTML = "";
    // render
    props.renderer(svg, props.data);
  });

  return <svg className="responsive-svg" ref={svgRef} />;
};

export default ReactSVG;

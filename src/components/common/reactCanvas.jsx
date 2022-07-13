//  reactCanvas.jsx

// reactCanvas.jsx
// Wrapper for a react canvas using refs - from https://koenvangilst.nl/blog/react-hooks-with-canvas
// can be passed any "canvas manipulation / drawing function and will render / keep updated as state changes"

// Usage:
// props = {
//    renderer: function - the vexflow rendering function (or any other type of canvas-manipulating function) - passed without parameters to the component, but the function should be able to accept a target canvas
//    data: optional - the data to be rendeed (processed by the rednderer function)
// }
import React from "react";
// import "../../css/reactCanvas.css";

const ReactCanvas = (props) => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;

    // clear the canvas before refresh
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    // render
    props.renderer(canvas, props.data);
  });

  return <canvas className="responsive-canvas" ref={canvasRef} />;
};

export default ReactCanvas;

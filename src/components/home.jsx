import React from "react";
// import TestComponent from "./test_component";
// import TestMusic from "./test_vex_canvas";
// import Glyph from "./glyph";
import ReactCanvas from "./common/reactCanvas";
import ReactSVG from "./common/reactSVG";
import Header from "./header";
import { drawSingleNote, renderSVG } from "../render/vexflowRenderer";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        note: "c/4"
      }
    };
  }

  // draw = (canvas) => {
  //   console.log("draw from parent launched")
  //   console.log(context)
  // }

  handleChange = () => {
    console.log("HandleChange");

    this.setState({ note: "b" });
  };

  changeNote = () => {
    const alpha = Array.from(Array(7)).map((e, i) => i + 65);
    const notes = alpha.map((x) => String.fromCharCode(x));
    let data = {
      note: notes[Math.floor(Math.random() * notes.length)] + "/4"
    };
    this.setState({ data: data });
  };
  render() {
    return (
      <React.Fragment>
        <div className="main">
          <Header />
          {/* this is the magic right here - pass a renderer function and drawing data to the reactCanvas component. will autorefresh on parent state change */}
          {/* <ReactCanvas renderer={drawSingleNote} data={this.state.data} /> */}
          {/* SVG looks way better and scales nicer / sharper! */}
          <ReactSVG renderer={renderSVG} data={this.state.data} />

          {/* just for testing: */}
          <div>{this.state.data.note}</div>

          <button
            type="button"
            className="btn btn-success"
            onClick={this.changeNote}
          >
            change note value in state
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;

import { Vex } from "vexflow";

function drawSingleNote(targetCanvas, data) {
  // canvas already passed along

  // const canvas = this.refs.canvas;
  let VF = Vex.Flow;
  // console.log(VF);
  let renderer = new VF.Renderer(targetCanvas, 1);
  // renderer.resize(1000, 170);
  let context = renderer.getContext();

  // in order to clear we need to maintain handle to context and clear it outside of the drawing procedure (or before, rather)

  //lets draw a stave
  // const {context} = this.state;
  // console.log(context);
  let stave = new VF.Stave(0, 0, targetCanvas.width);
  stave.addClef("treble").addTimeSignature("4/4");
  stave.setContext(context).draw(); //this works

  //set tick context - we need this for later when we do animation and assign x values to things
  let tickContext = new VF.TickContext();

  //draw a single note and animate it
  const note = new VF.StaveNote({
    clef: "treble",
    keys: [data.note],
    duration: "4"
  })
    .setContext(context)
    .setStave(stave);
  tickContext.addTickable(note);

  // put the note in an openGroup so we can play with it and animate it
  // const group = context.openGroup();
  note.draw();
}

function renderSVG(targetSVG, data) {
  // render a vexflow staff, sig and single note in an SVG element
  // const canvas = this.refs.canvas;
  let VF = Vex.Flow;
  // console.log(VF);
  let renderer = new VF.Renderer(targetSVG, 2);
  // renderer.resize(1000, 170);
  let context = renderer.getContext();

  // in order to clear we need to maintain handle to context and clear it outside of the drawing procedure (or before, rather)

  //lets draw a stave
  // const {context} = this.state;
  // console.log(context);

  // find svg dimentions
  const rect = targetSVG.getBoundingClientRect();
  let stave = new VF.Stave(0, 0, rect.width);
  stave.addClef("treble").addTimeSignature("4/4");
  stave.setContext(context).draw(); //this works

  //set tick context - we need this for later when we do animation and assign x values to things
  let tickContext = new VF.TickContext();

  //draw a single note and animate it
  const note = new VF.StaveNote({
    clef: "treble",
    keys: [data.note],
    duration: "4"
  })
    .setContext(context)
    .setStave(stave);
  tickContext.addTickable(note);

  // put the note in an openGroup so we can play with it and animate it
  // const group = context.openGroup();
  note.draw();
}

export { drawSingleNote, renderSVG };

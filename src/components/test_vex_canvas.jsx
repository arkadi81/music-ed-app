import React from "react";
import { Vex } from "vexflow";

export default class TestMusic extends React.Component {
  state = {
    context: undefined,
    questions: [
      {
        header: "Pitch identification",
        prompt: "Identify this pitch!",
        graphic: {
          root: "e",
          accidental: "",
          octave: 4
        },
        hint: "Remember, between the lines for treble is FACE",
        controls: <button>control button stuff</button>
      },
      {
        header: "Pitch identification",
        prompt: "Identify this pitch!",
        graphic: {
          root: this.props.note,
          accidental: "",
          octave: 4
        },
        hint: "Remember, between the lines for treble is FACE",
        controls: <button>control button stuff</button>
      }
    ]
  };

  // hooks and other methods

  componentDidUpdate() {
    console.log("component did update fired");
  }

  componentDidMount() {
    console.log("component did mount fired");
    // this.init();
    this.drawNote();
  }

  init = () => {
    // init various VF stuff
    const canvas = this.refs.canvas;
    let VF = Vex.Flow;
    let renderer = new VF.Renderer(canvas, 3);
    renderer.resize(1000, 170);
    let context = renderer.getContext();
    this.setState({ context: context });
  };

  drawNote = () => {
    console.log("drawNote fired");

    const canvas = this.refs.canvas;
    let VF = Vex.Flow;
    console.log(VF);
    let renderer = new VF.Renderer(canvas, 1);
    renderer.resize(1000, 170);
    let context = renderer.getContext();

    // in order to clear we need to maintain handle to context and clear it outside of the drawing procedure (or before, rather)

    //lets draw a stave
    // const {context} = this.state;
    // console.log(context);
    let stave = new VF.Stave(20, 20, 400);
    stave.addClef("treble").addTimeSignature("4/4");
    stave.setContext(context).draw(); //this works

    //set tick context - we need this for later when we do animation and assign x values to things
    let tickContext = new VF.TickContext();

    //draw a single note and animate it
    const note = new VF.StaveNote({
      clef: "treble",
      keys: ["c/5"],
      duration: "4"
    })
      .setContext(context)
      .setStave(stave);
    tickContext.addTickable(note);

    // put the note in an openGroup so we can play with it and animate it
    const group = context.openGroup();
    note.draw();
    context.closeGroup();
    // group.style.border = "1px black solid";
    //console.log(group.style.border);

    //lets try to see how much space the group is taking up by applying a border
    // group.classList.add('border-vis');

    // group.classList.add('note');
    // const n = document.getElementsByClassName("note");

    // console.log("width of note is " + n[0].style.border);

    //Force a dom-refresh by asking for the group's bounding box. Why? Most
    // modern browsers are smart enough to realize that adding .scroll class
    // hasn't changed anything about the rendering, so they wait to apply it
    // at the next dom refresh, when they can apply any other changes at the
    // same time for optimization. However, if we allow that to happen,
    // then sometimes the note will immediately jump to its fully transformed
    // position -- because the transform will be applied before the class with
    // its transition rule.

    // const box = group.getBoundingClientRect();
    // group.classList.add('scrolling'); // and now start it scrolling

    //lets draw some notes
    const { root, accidental, octave } = this.state.questions[
      Math.floor(Math.random() * 2)
    ].graphic;

    console.log("root: " + root);
    var notes = [
      // A quarter-note
      //
      new VF.StaveNote({
        clef: "treble",
        keys: [`${root}${accidental}/${octave}`],
        duration: "q"
      })
    ];

    // Create a voice in 4/4 and add above notes
    var voice = new VF.Voice({ num_beats: 1, beat_value: 4 });
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

    // Render voice
    voice.draw(context, stave);
  };

  test = () => {
    console.log("test function fired");
  };

  render() {
    const { header, prompt, hint, controls } = this.state.questions[0];

    return (
      <React.Fragment>
        <div class="question">
          so far so good, adding to canvas (and hopefully refreshing it), does
          not cause update to fire. done 20191210
          <div class="header">{header}</div>
          <div class="prompt">{prompt}</div>
          {/* <div id="graphic" ref="canvas"/> */}
          <canvas ref="canvas"></canvas>
          <div class="hint">{hint}</div>
          <div class="controls">
            {controls}
            <button onClick={this.drawNote}>Try to redraw</button>
            <button onClick={this.props.handleChange}>change note</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
